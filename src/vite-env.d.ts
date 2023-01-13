/// <reference types="vite/client" />

export type FiltersComponent = {
    id: number,
    name: string
}

export type SubTextComponent = {
    id: number,
    text: string,
    font?: string = null,
    classNames?: string
}

export type ImageComponent = {
    id: number,
    src: string,
    href?: string,
    tag?: string,
    legend?: string,
    text?: string
}

export type AnnotationsComponent = {
    id: number,
    text: string
}

export type SubtitleComponent = {
    id: number,
    text: string
}

export type PageComponent = {
    id: number,
    subtitle: string,
    text?: string,
    texts?: SubTextComponent[],
    annotations?: AnnotationsComponent[],
    image: ImageComponent
}

export type GalleryComponent = {
    id: string,
    name: string,
    template: string,
    title: string,
    text: string,
    images: ImageComponent[],
    filters: FiltersComponent[]
}

export type TextComponent = {
    id: string,
    name: string,
    template: string,
    title: string,
    annotations: AnnotationsComponent[],
    image: ImageComponent,
    pages: PageComponent[]
}

export type LinkComponent = {
    id: number,
    pageId: string,
}

export type HomeComponent = {
    id: string,
    name: string,
    template: string,
    subtitles: SubtitleComponent[],
    title: string,
    images: ImageComponent[],
    links: LinkComponent[]
}
