import ApiService from "@/services/api.service";

export default async function getObjects() {

    const response = await ApiService.get('objekte?per_page=100&_fields=title,meta.bilder,meta.viewerbilder,meta.date,id,meta.beschreibung,meta.kategorie,meta.dateien,meta.name,meta.pdf-informationsblatt,meta.benutzerdefiniertelinks,meta.dateipraefix,meta.subcatrobotics,meta.subcataudiovideo,meta.subcat3d');

    return response.data;

}