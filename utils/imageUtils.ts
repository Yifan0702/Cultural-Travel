/**
 * 获取正确的图片路径（支持子路径部署）
 */
export function getImagePath(path: string): string {
  // 如果已经是完整URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // 移除开头的斜杠（如果有）
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // 使用 Vite 的 BASE_URL 环境变量
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
