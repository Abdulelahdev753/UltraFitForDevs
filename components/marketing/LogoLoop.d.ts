import * as React from "react"

export interface LogoItemNode {
  node: React.ReactNode
  title?: string
  href?: string
  ariaLabel?: string
}

export interface LogoItemImage {
  src: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
  alt?: string
  title?: string
  href?: string
}

export type LogoItem = LogoItemNode | LogoItemImage

export interface LogoLoopProps {
  logos: LogoItem[]
  speed?: number
  direction?: "left" | "right" | "up" | "down"
  width?: number | string
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
  hoverSpeed?: number
  fadeOut?: boolean
  fadeOutColor?: string
  scaleOnHover?: boolean
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode
  ariaLabel?: string
  className?: string
  style?: React.CSSProperties
}

export declare const LogoLoop: React.MemoExoticComponent<
  (props: LogoLoopProps) => React.JSX.Element
>

export default LogoLoop
