export interface editMembsershipPayloadInterface {
    title: string;
    price: number | string;
    noOfDays: number | string;
    membershipType: string;
}

export interface editCategoryPayloadInterface {
    image: string | any;
    title: string;
    order: number | string;
}

export interface editPayloadInterfaceHoliday {
    date: any;
    title: string;
    description: string;
    religion: string;
}

export interface showSnackBarInterface {
    text: string
    type: string
}
