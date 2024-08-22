import ApiService from "@/services/api.service";

export async function getTermine() {
    const response = await ApiService.get('termin?_fields=title,meta.von,meta.bis,id,meta.ort,meta.thema');
    return response.data;

}