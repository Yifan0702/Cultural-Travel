/**
 * 省份名称标准化工具
 * 统一处理地图点击、路由参数、数据查询中的省份名称
 */

// 需要特殊处理的省份映射
const SPECIAL_PROVINCES: Record<string, string> = {
  '内蒙古自治区': '内蒙古',
  '内蒙': '内蒙古',
  '广西壮族自治区': '广西',
  '西藏自治区': '西藏',
  '宁夏回族自治区': '宁夏',
  '新疆维吾尔自治区': '新疆',
  '香港特别行政区': '香港',
  '澳门特别行政区': '澳门',
};

/**
 * 标准化省份名称
 * @param name - 输入的省份名称（可能带后缀或前缀）
 * @returns 标准化后的省份名称
 */
export const normalizeProvinceName = (name: string): string => {
  if (!name) return '';
  
  // 去除首尾空格
  let normalized = name.trim();
  
  // 检查特殊省份映射
  if (SPECIAL_PROVINCES[normalized]) {
    return SPECIAL_PROVINCES[normalized];
  }
  
  // 去除常见后缀
  const suffixes = ['省', '市', '特别行政区', '壮族自治区', '回族自治区', '维吾尔自治区', '自治区'];
  for (const suffix of suffixes) {
    if (normalized.endsWith(suffix)) {
      normalized = normalized.slice(0, -suffix.length);
      break;
    }
  }
  
  // 再次检查是否需要映射
  if (SPECIAL_PROVINCES[normalized]) {
    return SPECIAL_PROVINCES[normalized];
  }
  
  return normalized;
};

/**
 * 生成省份的唯一标识符（用于图片seed等）
 */
export const getProvinceId = (name: string): string => {
  const normalized = normalizeProvinceName(name);
  return normalized.replace(/\s+/g, '-').toLowerCase();
};
