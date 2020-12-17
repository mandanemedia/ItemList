interface Item {
    id: string
    name: string
    type: string
}

export interface ItemResponse {
    data?: Item
    errors?: any
}
