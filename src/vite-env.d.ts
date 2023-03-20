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
    text: string,
    isNumbered?: boolean,
    annotationNumber?: number
}

export type LinkComponent = {
    id: number,
    text: string,
    src?: string
}

export type PageComponent = {
    id: number,
    title: string,
    subtitle: string,
    text?: string,
    texts?: SubTextComponent[],
    annotations?: AnnotationsComponent[],
    image: ImageComponent,
    setActiveComponent: Function
}

export type GalleryComponent = {
    id: string,
    name: string,
    template: string,
    title: string,
    text: string,
    images: ImageComponent[],
    filters: FiltersComponent[],
    setActiveComponent: Function
}

export type TextComponent = {
    id: string,
    name: string,
    template: string,
    title: string,
    image: ImageComponent,
    pages: PageComponent[],
    nextPart?: string,
    setSelectedLink: Function
}

export type HomeComponent = {
    id: string,
    name: string,
    template: string,
    subtitle: string,
    title: string,
    images: ImageComponent[],
    links: LinkComponent[],
    setSelectedLink: Function,
    setActiveComponent: Function
}
