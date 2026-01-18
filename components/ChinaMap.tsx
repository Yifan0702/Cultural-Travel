
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

interface ChinaMapProps {
  onSelect: (province: string, position?: { x: number; y: number }) => void;
  selectedProvince: string | null;
}

const ChinaMap: React.FC<ChinaMapProps> = ({ onSelect, selectedProvince }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [blinkState, setBlinkState] = useState(true);
  const [provinceNameMap, setProvinceNameMap] = useState<Record<string, string>>({});

  const normalizeProvinceName = (name: string): string => {
    if (name.startsWith('内蒙古')) return '内蒙古';
    if (name.startsWith('黑龙江')) return '黑龙江';
    if (name.startsWith('广西')) return '广西';
    if (name.startsWith('西藏')) return '西藏';
    if (name.startsWith('宁夏')) return '宁夏';
    if (name.startsWith('新疆')) return '新疆';
    if (name.startsWith('香港')) return '香港';
    if (name.startsWith('澳门')) return '澳门';
    return name.replace(/(省|市|特别行政区|壮族自治区|回族自治区|维吾尔自治区|自治区)$/, '');
  };

  useEffect(() => {
    if (!chartRef.current) return;
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }
    
    const chart = chartInstance.current;

    const fetchMapData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}china-map.json`);
        const geoJson = await response.json();

        geoJson.features = geoJson.features.filter((f: any) => {
          const name = f.properties.name;
          return name !== '南海诸岛' && !name.includes('线');
        });

        echarts.registerMap('china_minimalist', geoJson);

        // 建立省份名称映射表（原始名称 -> normalized名称）
        const nameMap: Record<string, string> = {};
        geoJson.features.forEach((f: any) => {
          const originalName = f.properties.name;
          const normalized = normalizeProvinceName(originalName);
          nameMap[normalized] = originalName;
        });
        setProvinceNameMap(nameMap);
        
        console.log('[ChinaMap] Province name map:', nameMap);

        const options: echarts.EChartsOption = {
          backgroundColor: 'transparent',
          animation: true,
          animationDuration: 600,
          animationEasing: 'cubicInOut',
          tooltip: {
            show: true,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#8B2323',
            borderWidth: 1,
            padding: [8, 12],
            textStyle: { color: '#2c2c2c', fontSize: 13, fontWeight: 'bold' },
            formatter: (params: any) => `${normalizeProvinceName(params.name)} · 点击探索`
          },
          geo: {
            map: 'china_minimalist',
            roam: false,
            layoutSize: '90%', 
            layoutCenter: ['50%', '55%'],
            itemStyle: {
              areaColor: 'transparent',
              borderColor: '#8B2323',
              borderWidth: 1.6,
              opacity: 0.6,
            },
            emphasis: {
              itemStyle: { 
                areaColor: 'rgba(139, 35, 35, 0.05)',
                borderColor: '#8B2323', 
                borderWidth: 3,
                opacity: 1,
              },
              label: { show: false }
            },
            select: {
              itemStyle: {
                areaColor: '#F3E5AB',
                borderColor: '#8B2323',
                borderWidth: 3,
                opacity: 1
              },
              label: { show: false }
            }
          },
          series: [{ 
            type: 'map', 
            geoIndex: 0, 
            data: geoJson.features.map((f: any) => ({
              name: f.properties.name,
              selected: normalizeProvinceName(f.properties.name) === selectedProvince
            }))
          }]
        };

        chart.setOption(options);
        setIsMapReady(true);
        chart.on('click', (params) => {
          if (params.name && params.event) {
            const event = params.event.event;
            const chartDom = chartRef.current;
            if (chartDom) {
              const rect = chartDom.getBoundingClientRect();
              const x = event.offsetX;
              const y = event.offsetY;
              onSelect(normalizeProvinceName(params.name), { x, y });
            } else {
              onSelect(normalizeProvinceName(params.name));
            }
          }
        });
      } catch (error) {
        console.error("Failed to load map:", error);
      }
    };

    fetchMapData();
    const handleResize = () => chart && chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  // Blink animation for selected province
  useEffect(() => {
    if (!selectedProvince) return;
    
    const blinkInterval = setInterval(() => {
      setBlinkState(prev => !prev);
    }, 600); // 0.6秒切换一次，比较柔和
    
    return () => clearInterval(blinkInterval);
  }, [selectedProvince]);

  useEffect(() => {
    if (!isMapReady || !chartInstance.current || !selectedProvince) return;
    
    const chart = chartInstance.current;
    
    // 找到原始省份名称
    const originalProvinceName = provinceNameMap[selectedProvince];
    
    if (!originalProvinceName) {
      console.warn('[ChinaMap] Could not find original name for:', selectedProvince);
      return;
    }
    
    console.log('[ChinaMap] Blinking province:', selectedProvince, '-> Original:', originalProvinceName, 'State:', blinkState);
    
    // 更新geo配置以实现闪烁效果（白色 -> 金色渐变）
    const newRegions = [{
      name: originalProvinceName,
      itemStyle: {
        areaColor: blinkState ? 'rgba(255, 255, 255, 0.8)' : 'rgba(212, 175, 55, 0.75)',
        borderColor: '#8B2323',
        borderWidth: 3,
        opacity: 1
      }
    }];
    
    chart.setOption({
      animation: true,
      animationDuration: 600,
      animationEasing: 'cubicInOut',
      geo: [{
        regions: newRegions
      }]
    });
  }, [selectedProvince, isMapReady, blinkState, provinceNameMap]);
  
  // 清除闪烁效果
  useEffect(() => {
    if (!isMapReady || !chartInstance.current || selectedProvince) return;
    
    const chart = chartInstance.current;
    chart.setOption({
      geo: [{
        regions: []
      }]
    });
  }, [selectedProvince, isMapReady]);

  // Force resize when component becomes visible (e.g., after tab switch)
  useEffect(() => {
    if (!chartInstance.current || !chartRef.current) return;
    
    // Resize immediately
    chartInstance.current.resize();
    
    // Resize again after a short delay to ensure container is fully rendered
    const timer = setTimeout(() => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isMapReady]);

  // Use IntersectionObserver to detect when map becomes visible
  useEffect(() => {
    if (!chartRef.current || !chartInstance.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && chartInstance.current) {
            // Map is now visible, resize it
            chartInstance.current.resize();
            // Also resize after a small delay for safety
            setTimeout(() => {
              if (chartInstance.current) {
                chartInstance.current.resize();
              }
            }, 150);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(chartRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [isMapReady]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
        {/* Subtle decorative background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #8B2323 1px, transparent 1px)',
            backgroundSize: '32px 32px'
        }}></div>
        <div ref={chartRef} className="w-full h-full z-10" />
    </div>
  );
};

export default ChinaMap;
