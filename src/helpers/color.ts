export function getYearBasedColor(
  year: string,
  isSelected: boolean = false
): [number, number, number, number] {
  if (isSelected) {
    return [255, 165, 0, 255]; // Bright orange for selection
  }

  // 16 years: 2009–2024
  // Alpha steps from 80 (oldest) to 255 (newest), 16 steps
  // Step size: (255 - 80) / 15 = 11.67 ≈ 12
  // So: 80, 92, 104, ..., 255

  switch (year) {
    case "2009":
      return [210, 225, 245, 80];
    case "2010":
      return [185, 210, 235, 92];
    case "2011":
      return [155, 195, 225, 104];
    case "2012":
      return [125, 180, 215, 116];
    case "2013":
      return [95, 165, 205, 128];
    case "2014":
      return [70, 150, 195, 140];
    case "2015":
      return [50, 135, 185, 152];
    case "2016":
      return [35, 120, 175, 164];
    case "2017":
      return [25, 105, 165, 176];
    case "2018":
      return [15, 90, 155, 188];
    case "2019":
      return [10, 75, 145, 200];
    case "2020":
      return [8, 60, 135, 212];
    case "2021":
      return [6, 50, 125, 224];
    case "2022":
      return [4, 40, 115, 236];
    case "2023":
      return [2, 30, 105, 248];
    case "2024":
      return [1, 20, 95, 255];
    default:
      return [240, 240, 240, 255]; // Light gray fallback
  }
}
