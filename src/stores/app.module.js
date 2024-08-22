// Pinia Store
import { defineStore } from 'pinia';
import getObjects from "@/services/object.service";
import {getTermine} from "@/services/termin.service";
import {getInformationen, getRechtliches} from "@/services/link.service";

const state = () => ({
   objects:[],
    viewer:null,
    resetObject:false,
    showDatenschutz:false,
    showImpressum:false,
    selectedIndex:0,
    leftObject:null,
    rightObject:null,
    currentObject:null,
    filter:null,
    subfilter:null,
    loading:false,
    filterMobile:{
        subkategorie:null,
        kategorie:null
    },
    termine:[],
    rechtliches:[],
    informationen:[],

});
export const useAppStore = defineStore('appStore',{
    state: state,



// getters
    getters: {
        filteredObjects(){
            if(this.filter===null) return this.objects.slice(0,6);
            else if(this.filter === 'sonstiges') return this.objects.filter(x => !x.meta.kategorie || x.meta.kategorie.length <= 0 );
            else if(this.filterMobileKategorie==='service'){
                return this.objects.filter(x=>x.meta.kategorie.includes(this.filterMobileKategorie) || x.meta.kategorie.includes('bilder') || x.meta.kategorie.includes('online_dienste') )
            }
            else if(this.filter && this.subfilter){
                let result = this.objects.filter(x=>x.meta.kategorie.includes(this.filter));
                switch(this.filter){
                    case 'robotics':
                        result= result.filter(x=>x.meta.subcatrobotics === this.subfilter);
                        break;
                    case 'audio':
                        result= result.filter(x=>x.meta.subcataudiovideo === this.subfilter);
                        break;
                    case 'objekte3d':
                        result= result.filter(x=>x.meta.subcat3d === this.subfilter);
                        break;
                }
                return result;
            }
            else return this.objects.filter(x=>x.meta.kategorie.includes(this.filter));
        }
    },

// actions
    actions:{
        setFilterMobile(value){
            this.filterMobile.kategorie=value;
        },
        setSubFilterMobile(value){
            this.filterMobile.subkategorie=value;
        },
        toggleDatenschutz(){
          this.showDatenschutz=!this.showDatenschutz;
        },
        toggleImpressum(){
          this.showImpressum=!this.showImpressum;
        },
        setFilter(filter,subfilter){
            if(subfilter){
                this.subfilter=subfilter
            }
          this.filter=filter;
          this.initObjects();
        },
        setReset(value){
          this.resetObject=value;
        },
        destroyViewer(){
            this.viewer.destroy();
        },
        setViewer(object){
            this.viewer=object;
        },
        async getObjects() {
            this.loading=true;
            this.objects.push(...(await getObjects()));
            this.initObjects();
            this.loading=false;
        },
        async getTermine(){

            let termine = await getTermine();
            for(let termin of termine){
                termin.meta.kategorie=new Array();
                termin.meta.kategorie.push("termine");
            }
            this.objects.push(...termine);
        },
        async getRechtliches(){
            this.rechtliches= await getRechtliches();
        },
        async getInformationen(){
            this.informationen= await getInformationen();
        },
        initObjects(){
            this.setLeftObject();

            this.setSelectedObject();
            this.setRightObject();
            this.selectedIndex=0;
        },
        setLeftObject(){
            if(this.selectedIndex>0) {
                this.leftObject= this.filteredObjects[this.selectedIndex - 1];
            }else{
                this.leftObject= this.filteredObjects[this.filteredObjects.length-1];
            }
        },
        setRightObject(){
            if(this.selectedIndex<this.filteredObjects.length-1){
                this.rightObject= this.filteredObjects[this.selectedIndex+1]
            }else{
                this.rightObject= this.filteredObjects[0];
            }
        },
        setSelectedIndex(index){
            this.selectedIndex=index;
        },
        setSelectedObject(){
            this.resetObject=true;
            this.currentObject=null;
            this.currentObject=this.filteredObjects[this.selectedIndex];
            this.resetObject=false;
        },
        selectObject(objectId){
            //console.log(this.objects.findIndex(x=>x.id===objectId))
            console.log(this.filteredObjects);
            console.log(this.filteredObjects.findIndex(x=>x.id===objectId));
            console.log(this.filteredObjects[this.filteredObjects.findIndex(x=>x.id===objectId)])
            this.rightObject=this.filteredObjects[this.filteredObjects.findIndex(x=>x.id===objectId)];
        },
    }
});