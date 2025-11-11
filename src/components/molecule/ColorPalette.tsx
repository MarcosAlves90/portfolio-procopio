import { useMemo } from 'react'
import {
    getContrastingTextColor,
    parseColorToRGB,
    rgbToCmyk,
    formatRGB,
    formatCMYK,
} from '@/utils/colorConversion'

interface ColorItem {
    originalColor: string
    textColor: string
    rgb: ReturnType<typeof parseColorToRGB>
    cmyk: ReturnType<typeof rgbToCmyk> | null
}

interface ColorPaletteProps {
    colors?: string[]
}

function computeColorData(colors: string[]): ColorItem[] {
    return colors.map((color) => {
        const textColor = getContrastingTextColor(color)
        const rgb = parseColorToRGB(color)
        const cmyk = rgb ? rgbToCmyk(rgb.r, rgb.g, rgb.b) : null

        return {
            originalColor: color,
            textColor,
            rgb,
            cmyk,
        }
    })
}

export default function ColorPalette({ colors }: ColorPaletteProps) {
    const colorData = useMemo(
        () => (Array.isArray(colors) && colors.length > 0 ? computeColorData(colors) : []),
        [colors],
    )

    if (colorData.length === 0) return null

    return (
        <div
            role="region"
            aria-labelledby="palette-heading"
            className="bg-foreground rounded-xl flex-1 pb-4 sm:pb-6 flex items-stretch flex-col"
        >
            <h2
                id="palette-heading"
                className="font-title text-2xl xl:text-3xl p-4 xl:p-6"
            >
                Paleta de cores
            </h2>

            <div className="flex items-stretch justify-center flex-1 max-sm:flex-col">
                {colorData.map(
                    ({ originalColor, textColor, rgb, cmyk }, index) => (
                        <div
                            key={`${originalColor}-${index}`}
                            className="flex h-25 w-full flex-col justify-end text-sm sm:h-80 lg:h-full pb-3 px-4"
                            style={{ backgroundColor: originalColor }}
                            title={originalColor}
                        >
                            <p style={{ color: textColor }}>{originalColor}</p>
                            {rgb && (
                                <p style={{ color: textColor }}>
                                    {formatRGB(rgb)}
                                </p>
                            )}
                            {cmyk && (
                                <p style={{ color: textColor }}>
                                    {formatCMYK(cmyk)}
                                </p>
                            )}
                        </div>
                    ),
                )}
            </div>
        </div>
    )
}
