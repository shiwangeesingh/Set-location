import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
import {getTimeZone} from '../common';
import csc from 'country-state-city'
import { NgxIndexedDB } from 'ngx-indexed-db';
declare var $: any;
@Component({
  selector: 'app-location-management',
  templateUrl: './location-management.component.html',
  styleUrls: ['./location-management.component.css']
})

export class LocationManagementComponent implements OnInit {
  addLocationForm : FormGroup;
  editLocationForm : FormGroup;
  submitted = false;
  dropdownSettings;
  db = new NgxIndexedDB('locationDb', 1);
  item
  id
  appdata
  locationData = []
  timezoneList = []
  dropdownList 
  sunTo
  sunTimeTo
  sunFrom
  sunTimeFrom
  monTo
  monTimeTo
  monFrom
  monTimeFrom
  tueTo
  tueTimeTo
  tueFrom
  tueTimeFrom
  wedTo
  wedTimeTo
  wedFrom
  wedTimeFrom
  thuTo
  thuTimeTo
  thuFrom
  thuTimeFrom 
  friTo
  friFrom 
  friTimeTo
  friTimeFrom
  satTo
  satTimeTo
  satFrom
  satTimeFrom 
  locationId
  monActive
  tueActive
  wedActive
  thuActive
  friActive
  satActive
  time
  sunActive
  state
  selectedItems
  page = 1
  phoneNumber
  constructor(
    private formBuilder: FormBuilder,  
    ) { }
    get f() { return this.addLocationForm.controls; }
    get e() { return this.editLocationForm.controls; }
    app = []
  ngOnInit() {
    let self = this
        $('#tag').tagsinput({
      confirmKeys: [13, 44]
    });
    $('#tag1').tagsinput({
      confirmKeys: [13, 44]
    });

    this.submitted = false;
    //*****************************Add form ******************* */
    this.addLocationForm = this.formBuilder.group({
      locationName: ['',[Validators.required]],
      suitNo: ['',],
      address: ['',],
      addressLine2: ['',],
      city: ['',],
      zipCode: ['',[Validators.maxLength(15),Validators.minLength(5)]],
      timeZone: ['',],
  })
  //*********************************Edit form ********************* */
  this.editLocationForm = this.formBuilder.group({
    locationName: ['',[Validators.required]],
    suitNo: ['',],
    address: ['',],
    addressLine2: ['',],
    city: ['',],
    zipCode: ['',[Validators.maxLength(15),Validators.minLength(5)]],
    timeZone: ['',],
})
//*************************************Db setup ********************** */
self.db.openDatabase(1,  evt => {
    let objectStore =   evt.currentTarget.result.createObjectStore('location', { keyPath: 'id', autoIncrement: true });
});
this.getTimeZoneList()
this.getLocationData()
}

//*******************************************************Add Location ************************ */
addLocation() {
  this.submitted = true;
  if(this.addLocationForm.invalid)
  {
    return;
  }
  console.log("this.state",this.state)
let data = {
  locationName: this.addLocationForm.value.locationName?this.addLocationForm.value.locationName:"",
  phoneNumber: this.phoneNumber,
  suitNo: this.addLocationForm.value.suitNo?this.addLocationForm.value.suitNo:"",
  address: this.addLocationForm.value.address?this.addLocationForm.value.address:"", 
  addressLine2: this.addLocationForm.value.addressLine2?this.addLocationForm.value.addressLine2:"",
  zipCode: this.addLocationForm.value.zipCode?this.addLocationForm.value.zipCode:"",
  timeZone: this.addLocationForm.value.timeZone?this.addLocationForm.value.timeZone:"",
  facilityTime: this.time,
  appointmentPool: $("#tag").val(),
  city: this.addLocationForm.value.city?this.addLocationForm.value.city:"",
  state: this.state,   
}
 var self =this
 this.db.openDatabase(1,  evt => {
    let objectStore =   evt.currentTarget.result.createObjectStore('location', { keyPath: 'id', autoIncrement: true });
}).then(function () {
  self.db.add('location',data).then(
    () => {
      self.getLocationData()
    },
    error => {
        console.log(error);
    }
  );
});
}

//************************************ Get location data********************** */
getLocationData(){
  var self =this
  this.db.openDatabase(1,  evt => {
    let objectStore =   evt.currentTarget.result.createObjectStore('location', { keyPath: 'id', autoIncrement: true });
}).then(function () {
  self.db.getAll('location').then(
    locn => {
      self.locationData = locn
    },
    error => {
        console.log(error);
    });
})
}

//********************************* State List **************************** */
getStates(){
  let countryId = '101'
  this.dropdownList = csc.getStatesOfCountry(countryId)
  this.dropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
}

//************************************ Delete Location *************************** */
deleteLocation(id){
  var self =this
  this.db.openDatabase(1,  evt => {
    let objectStore =   evt.currentTarget.result.createObjectStore('location', { keyPath: 'id', autoIncrement: true });
}).then(function () {
  self.db.delete('location', id).then(
    () => {
      self.getLocationData()
    },
    error => {
        console.log(error);
    }
)})
}

//************************************************** Edit ***************************************** */
//***********************Patch data ****************************** */
stateId
stateName
edit(data){
  $('#tag1').tagsinput('removeAll');
this.getStates()
this.editLocationForm.patchValue({
  locationName: data.locationName,
  suitNo: data.suitNo,
  address: data.address,
  addressLine2:data.addressLine2,
  city: data.city,
  zipCode: data.zipCode,
  timeZone: data.timeZone
}) 
$('#tag1').tagsinput('add', data.appointmentPool)
this.phoneNumber = data.phoneNumber,
this.item = data.timeZone
this.stateId = data.state.id
this.stateName = data.state.name
this.selectedItems = [{id:this.stateId,name:this.stateName}]
this.id = data.id
this.sunTo = data.facilityTime.sunTo
this.sunTimeTo = data.facilityTime.sunTimeTo
this.sunFrom = data.facilityTime.sunFrom
this.sunTimeFrom = data.facilityTime.sunTimeFrom
this.monTo = data.facilityTime.monTo
this.monTimeTo = data.facilityTime.monTimeTo
this.monFrom = data.facilityTime.monFrom
this.monTimeFrom = data.facilityTime.monTimeFrom 
this.tueTo = data.facilityTime.tueTo
this.tueTimeTo = data.facilityTime.tueTimeTo
this.tueFrom = data.facilityTime.tueFrom
this.tueTimeFrom = data.facilityTime.tueTimeFrom
this.wedTo = data.facilityTime.wedTo
this.wedTimeTo = data.facilityTime.wedTimeTo
this.wedFrom = data.facilityTime.wedFrom
this.wedTimeFrom = data.facilityTime.wedTimeFrom
this.thuTo = data.facilityTime.thuTo
this.thuTimeTo = data.facilityTime.thuTimeTo
this.thuFrom = data.facilityTime.thuFrom
this.thuTimeFrom = data.facilityTime.thuTimeFrom
this.friTo = data.facilityTime.friTo
this.friTimeTo = data.facilityTime.friTimeTo 
this.friFrom = data.facilityTime.friFrom
this.friTimeFrom =  data.facilityTime.friTimeFrom
this.satTo = data.facilityTime.satTo
this.satTimeTo = data.facilityTime.satTimeTo
this.satFrom = data.facilityTime.satFrom
this.satTimeFrom = data.facilityTime.satTimeFrom
this.addFacilityTime()
this.onItemSelect(this.selectedItems)
$('#editLocation').modal('toggle');
}

//************************************ Update data ************************* */
editLocation() {
this.submitted = true;
if(this.editLocationForm.invalid)
{
  return;
}
let data = {
  id: this.id,
  locationName: this.editLocationForm.value.locationName?this.editLocationForm.value.locationName:"",
  phoneNumber: this.phoneNumber,
  suitNo: this.editLocationForm.value.suitNo?this.editLocationForm.value.suitNo:"",
  address: this.editLocationForm.value.address?this.editLocationForm.value.address:"", 
  addressLine2: this.editLocationForm.value.addressLine2?this.editLocationForm.value.addressLine2:"",
  zipCode: this.editLocationForm.value.zipCode?this.editLocationForm.value.zipCode:"",
  timeZone: this.editLocationForm.value.timeZone?this.editLocationForm.value.timeZone:"",
  facilityTime: this.time,
  appointmentPool: $('#tag1').val(),
  city: this.editLocationForm.value.city?this.editLocationForm.value.city:"",
  state: this.state?this.state:"",   
}
var self =this
this.db.openDatabase(1,  evt => {
  let objectStore =   evt.currentTarget.result.createObjectStore('location', { keyPath: 'id', autoIncrement: true });
}).then(function () {
self.db.update('location', data).then(
  () => {
    self.getLocationData()
    $('#tag1').tagsinput('removeAll');
  },
  error => {
      console.log(error);
  });
});
}

//************************************** Reset **************************** */
reset(){
  this.addLocationForm = this.formBuilder.group({
    locationName: ['',[Validators.required]],
    suitNo: ['',],
    address: ['',],
    addressLine2: ['',],
    city: ['',],
    zipCode: ['',[Validators.maxLength(15),Validators.minLength(5)]],
    timeZone: ['',],
})
this.sunTo = undefined 
this.sunTimeTo  = undefined
this.sunFrom = undefined
this.sunTimeFrom = undefined
this.monTo = undefined
this.monTimeTo = undefined
this.monFrom = undefined
this.monTimeFrom = undefined
this.tueTo = undefined
this.tueTimeTo = undefined
this.tueFrom = undefined
this.tueTimeFrom = undefined
this.wedTo =  undefined
this.wedTimeTo = undefined
this.wedFrom = undefined
this.wedTimeFrom = undefined
this.thuTo= undefined
this.thuTimeTo = undefined
this.thuFrom = undefined
this.thuTimeFrom = undefined
this.friTo = undefined
this.friTimeTo = undefined
this.friFrom = undefined
this.friTimeFrom = undefined
this.satTo = undefined
this.satTimeTo = undefined
this.satFrom = undefined
this.satTimeFrom = undefined
this.sunActive = false
this.monActive = false
this.tueActive = false
this.wedActive = false
this.thuActive = false
this.friActive = false
this.satActive = false
this.phoneNumber = ""
this.state = ""
$('#tag').tagsinput('removeAll');
this.selectedItems = []
this.getStates()
this.getTimeZoneList()
}

//**************************** Get time zone ****************************************** */
async getTimeZoneList(){
  this.timezoneList = await getTimeZone()
}
//************************** Zipcode Validator *********************************** */
zipCodeValidator(event){
    if(event.key == ' ' || event.key == ',' || event.zipCode == '.')
    return false
  }

//*************************** Pagination ************************************ */
pageChange(page){
  this.page = page
  this.getLocationData();
}


onItemSelect(item: any) {
  this.state =  this.selectedItems[0];
}


//********************************************** Add Facility ************************** */
addFacilityTime() {
  this.time = {
    sunTo: this.sunTo, 
    sunTimeTo:this.sunTimeTo,
    sunFrom: this.sunFrom,
    sunTimeFrom: this.sunTimeFrom,
    monTo: this.monTo,
    monTimeTo: this.monTimeTo,
    monFrom: this.monFrom,
    monTimeFrom: this.monTimeFrom, 
    tueTo: this.tueTo,
    tueTimeTo: this.tueTimeTo,
    tueFrom: this.tueFrom,
    tueTimeFrom: this.tueTimeFrom,
    wedTo: this.wedTo,
    wedTimeTo: this.wedTimeTo,
    wedFrom: this.wedFrom,
    wedTimeFrom: this.wedTimeFrom,
    thuTo: this.thuTo,
    thuTimeTo: this.thuTimeTo,
    thuFrom: this.thuFrom,
    thuTimeFrom : this.thuTimeFrom,
    friTo: this.friTo,
    friTimeTo : this.friTimeTo, 
    friFrom: this.friFrom,
    friTimeFrom :  this.friTimeFrom,
    satTo: this.satTo,
    satTimeTo : this.satTimeTo,
    satFrom: this.satFrom,
    satTimeFrom : this.satTimeFrom,
    sunActive: this.sunActive?this.sunActive:false,
    monActive: this.monActive?this.monActive:false,
    tueActive: this.tueActive?this.tueActive:false,
    wedActive: this.wedActive?this.wedActive:false,
    thuActive: this.thuActive?this.thuActive:false,
    friActive: this.friActive?this.friActive:false,
    satActive: this.satActive?this.satActive:false,
  }
}
//********************************* Apply to all ************************ */
applyToAllCheck(to,from,timeto,timefrom){
if(this.sunActive){
  this.sunTo = to;
  this.sunFrom = from;
  this.sunTimeFrom = timefrom;
  this.sunTimeTo = timeto
}
if(this.monActive){
  this.monTo = to;
  this.monFrom = from;
  this.monTimeFrom = timefrom;
  this.monTimeTo = timeto
}if(this.tueActive){
  this.tueTo = to;
  this.tueFrom = from;
  this.tueTimeFrom = timefrom;
  this.tueTimeTo = timeto
}if(this.wedActive){
  this.wedTo = to;
  this.wedFrom = from;
  this.wedTimeFrom = timefrom;
  this.wedTimeTo = timeto
}if(this.thuActive){
  this.thuTo = to;
  this.thuFrom = from;
  this.thuTimeFrom = timefrom;
  this.thuTimeTo = timeto
}if(this.friActive){
  this.friTo = to;
  this.friFrom = from;
  this.friTimeFrom = timefrom;
  this.friTimeTo = timeto
}if(this.satActive){
  this.satTo = to;
  this.satFrom = from;
  this.satTimeFrom = timefrom;
  this.satTimeTo = timeto
}
this.addFacilityTime()
}

//*************************** Mobile number format ******************** */
formatPhoneNumber() {
   let phoneNumberString =this.phoneNumber;
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '')
    this.phoneNumber =  [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    return
  }
  return null
}

//************************************* Sorting ************************** */
//ascending
sortAsc()
{
  this.locationData = this.locationData.sort(function (a, b) {
    return a.id - b.id;
  })
}
//descending
sortDsc()
{
  this.locationData = this.locationData.sort(function (a, b) {
    return b.id - a.id;
  })
}

}

