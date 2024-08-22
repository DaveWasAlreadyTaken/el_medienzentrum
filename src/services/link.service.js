import ApiService from "@/services/api.service";

export async function getRechtliches(){

    const response = await ApiService.get('rechtliches?_fields=title,meta.link');
    return response.data;
}
export async function getInformationen(){

    const response = await ApiService.get('informationen?_fields=title,meta.link');
    return response.data;
}