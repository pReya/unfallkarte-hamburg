export function getYearBasedColor(
  year: string,
  isSelected: boolean = false
): [number, number, number, number] {
  // If selected, return a bright highlight color (e.g., bright orange/red)
  if (isSelected) {
    return [255, 165, 0, 255]; // Bright orange with full opacity
  }

  // Original year-based coloring
  switch (year) {
    case "2009":
      return [68, 130, 180, 51]; // most transparent (20% opacity)
    case "2010":
      return [68, 130, 180, 68]; // 27% opacity
    case "2011":
      return [68, 130, 180, 85]; // 33% opacity
    case "2012":
      return [68, 130, 180, 102]; // 40% opacity
    case "2013":
      return [68, 130, 180, 119]; // 47% opacity
    case "2014":
      return [68, 130, 180, 136]; // 53% opacity
    case "2015":
      return [68, 130, 180, 153]; // 60% opacity
    case "2016":
      return [68, 130, 180, 170]; // 67% opacity
    case "2017":
      return [68, 130, 180, 187]; // 73% opacity
    case "2018":
      return [68, 130, 180, 204]; // 80% opacity
    case "2019":
      return [68, 130, 180, 221]; // 87% opacity
    case "2020":
      return [68, 130, 180, 238]; // 93% opacity
    case "2021":
      return [68, 130, 180, 255]; // fully opaque
    case "2022":
      return [68, 130, 180, 255]; // fully opaque
    case "2023":
      return [68, 130, 180, 255]; // fully opaque
    default:
      return [240, 240, 240, 255]; // light gray fallback
  }
}
