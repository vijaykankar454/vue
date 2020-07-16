import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import config from './config.js'


Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    step: 0,
    mobilenumber: '',
    showmenu: false,
    participant: 'none',
    loginerr: '',
    dashboardPlatinum: [],
    dashboardGold: [],
    dashboardSilver: [],
    project: 'none',
    stalllList: [],
    userUnitList: [],
    PopUpBuilderName: '',
    Loading: false,
    otpNumber : 0
  },
  mutations: {
    changeStatus (state,step) {
      state.step = step
    },
    changeMobileNumber (state,authData) {
      state.mobilenumber = authData.mobile
    },
    updatemenu (state,senttype) {
      state.showmenu = senttype
    },
    showParticipant (state,data) {
      state.participant = data
    },
    updateErr (state,errormsg) {
      state.loginerr = errormsg
    }
    ,
    updatedashboardPlatinum (state,patimnumData) {
      state.dashboardPlatinum.push(patimnumData)
    },
    updatedashboardGold (state,goldData) {
      state.dashboardGold.push(goldData)
    },
    updatedashboardSilver (state,silverData) {
      state.dashboardSilver.push(silverData)
    },
    showProject(state, data) {
      if (data == 'none') {
        sessionStorage.removeItem('virtual_url')
      }
      state.project = data
    },
    setstalllList(state, stallData) {
      if (stallData == '') {
        state.stalllList=[]
      } else {
        state.stalllList.push(stallData)
      }
    },
    setUserUnitList(state, unitData) {
      if (unitData == '') {
        state.userUnitList=[]
      } else {
        state.userUnitList.push(unitData)
      }
    },
    setPopUpBuilderName(state, builderName) {
      state.PopUpBuilderName = builderName
    },
    setLoading(state, loadStaus) {
      state.Loading = loadStaus

    },
    otpCount(state, number) {
      state.otpNumber = state.otpNumber+number
    }
  },
  actions: {
    verifyOfferKey({ commit, dispatch }, offerkey) {
      var formData = new FormData();
      formData.append('offer_type_key', offerkey)
      formData.append('group_by','type')
      axios.post('expo/get_participant_list', formData)
        .then(res => {
          if (res.data.response_desc == 'Success') {
            localStorage.setItem('MetaTitle', 'value1');
            localStorage.setItem('MetaDescription', 'value2');
            localStorage.setItem('virtual_key',offerkey)
          } else {
            location.href = config.DEFAULT_URL.HOST_URL;
          }
        })
        .catch(error => console.log(error))

    },
    signup({ commit, dispatch }, authData) {
      var formData = new FormData();
      formData.append('full_name', authData.full_name)
      formData.append('email_id', authData.email_id)
      formData.append('password', authData.password)
      formData.append('login_by', '')
      formData.append('request_from', 'registration')
      formData.append('authorization',localStorage.getItem('virtual_token'))
      axios.post('users/register_email', formData)
        .then(res => {
          if (res.data.response_code == 200) {
            localStorage.setItem('virtual_username', authData.full_name)
            localStorage.setItem('virtual_email', authData.email_id)
            commit('changeStatus', 0)
            router.push('/dashboard');
          } else {
            commit('updateErr',res.data.response_desc) 
          }
        })
        .catch(error => console.log(error))
    },
    login({ commit, dispatch }, authData) {
      
      var formData = new FormData();
      formData.append('mobile',authData.mobile)
      axios.post('auth/send_login_otp', formData)
        .then(res => {
          if (res.data.response_desc == 'Success') {
            commit('updateErr', '') 
            commit('changeMobileNumber',authData)
            commit('changeStatus', 2)
            commit('updateErr','')
          } else {
            commit('updateErr', res.data.response_desc)
          
          }
        })
        .catch(error => console.log(error))
    },
    verifyOTP({ commit, dispatch }, authData) {
    
      var formData = new FormData();
      formData.append('mobile', authData.mobile)
      formData.append('otp',authData.otp)
      axios.post('auth/verify_login_otp', formData)
        .then(res => {
          if (res.data.response_code == 200) { 
              commit('updateErr', '') 
              localStorage.setItem('virtual_token', res.data.data.token)
              localStorage.setItem('virtual_mobile', res.data.data.mobile)
              localStorage.setItem('virtual_username', res.data.data.full_name)
              if (res.data.data.email_id != '') {
                localStorage.setItem('virtual_email', res.data.data.email_id)
              } else {
                localStorage.setItem('virtual_email', res.data.data.mobile+"@homeonline.com")
              }
              const formDataval = {
                mobile: ''
              }
              commit('changeMobileNumber', formDataval)
            if (res.data.data.sub_status.includes("success")) {

              commit('changeStatus', 0)
              router.push('/dashboard');

            } else if (res.data.data.sub_status.includes("new_user")) {
              commit('changeStatus', 4)
            
            } else if (!res.data.data.sub_status.includes("new_user") && res.data.data.sub_status.includes("email_not_verified")) {
              commit('changeStatus', 0)
              router.push('/dashboard');
            } else {
              commit('updateErr', "Something went wrong.Please try again")
            }
          } else {
            commit('updateErr',res.data.response_desc)
          }
        })
        .catch(error => console.log(error))

    },
    logout ({commit}) {
        commit('changeMobileNumber','')
        localStorage.removeItem('virtual_token')
        localStorage.removeItem('virtual_mobile')
        localStorage.removeItem('virtual_email')
        localStorage.removeItem('virtual_username')
        sessionStorage.removeItem('virtual_url');
        localStorage.removeItem('MetaTitle')
        localStorage.removeItem('MetaDescription')
        router.replace(localStorage.getItem('virtual_key'))
    },
    getParticipantList ({commit}) {
      var formData = new FormData();
      formData.append('offer_type_key', localStorage.getItem('virtual_key'))
      formData.append('group_by','type')
      axios.post('expo/get_participant_list', formData)
        .then(res => {
          if (res.data.response_code == 200) { 
            const patinumData = res.data.data.platinum
            if (patinumData.length > 0) {
              for (let key in patinumData) {
                const newpatinumlist = patinumData[key]
               
                newpatinumlist.stepid = key
                commit('updatedashboardPlatinum',newpatinumlist)
              }
              
            }
            const goldData = res.data.data.gold
            if (goldData.length > 0) {
              for (let key in goldData) {
                const newpdoldlist = goldData[key]
               
                newpdoldlist.stepid = key
                commit('updatedashboardGold',newpdoldlist)
              }
              
            }
            const silverData = res.data.data.silver
            if (silverData.length > 0) {
              for (let key in silverData) {
                const newsilverlist = silverData[key]
               
                newsilverlist.stepid = key
                commit('updatedashboardSilver',newsilverlist)
              }
              
            }
           
          } 
        })
        .catch(error => console.log(error))
    },
    getStallDataInfo ({commit},userID) {
      var formData = new FormData();
      formData.append('offer_type_key', localStorage.getItem('virtual_key'))
      if (userID) {
        formData.append('user_id', userID)
      }
      axios.post('expo/get_participant_list', formData)
        .then(res => {
          if (res.data.response_code == 200) { 
            const stallData = res.data.data
            if (stallData.length > 0) {
              for (let key in stallData) {
                const arrlist = stallData[key]
                arrlist.stepid = key
                commit('setstalllList',arrlist)
              }
              
            }
           
          } 
        })
        .catch(error => console.log(error))
    },
    getStallDataInfoUnit ({commit},userID) {
      var formData = new FormData();
      formData.append('offer_type_key', localStorage.getItem('virtual_key'))
      if (userID) {
        formData.append('user_id', userID)
      }
      axios.post('expo/get_participant_list', formData)
        .then(res => {
          if (res.data.response_code == 200) { 
            const unitList = res.data.data[0].projects[0].units_availability
            commit('setPopUpBuilderName', res.data.data[0].userCompanyName)
            if (unitList.length > 0) {
              for (let key in unitList) {
                const unitdatapush = {
                  id:key,
                  bhkData: (unitList[key].propertyUnitBedRooms != '' && unitList[key].propertyUnitBedRooms != 0) ? unitList[key].propertyUnitBedRooms + " BHK "+unitList[key].propertyUnitTypeNames : unitList[key].propertyUnitTypeNames,
                  companyName: res.data.data[0].projects[0].projectName,
                  projectAddress: res.data.data[0].projects[0].projectAddress1,
                  projectCurrentStatus: res.data.data[0].projects[0].projectCurrentStatus,
                  projectUrl: "/"+res.data.data[0].projects[0].link,
                  projectImg: res.data.data[0].projects[0].projCoverImage,
                  unitPrice: unitList[key].propertyUnitPriceRange,
                  propertyKey: res.data.data[0].projects[0].projectKey,
                  propertyUnitId: unitList[key].propertyUnitTypeIDs,
                  propertyBhk: unitList[key].propertyUnitBedRooms,
                  offerheadline: res.data.data[0].projects[0].offer_headline,
                  offerdescription:res.data.data[0].projects[0].offer_description,
                  unitsqft:(unitList[key].propertyUnitSqftRange != '') ? unitList[key].propertyUnitSqftRange+" sqft":""
                }
               
                commit('setUserUnitList', unitdatapush)
              }
              commit('showProject','block');
            }
          } 
        })
        .catch(error => console.log(error))
    },
    saveIntereststore({ commit, dispatch },formDataGet) {
      if (formDataGet.hspropertyBhk) {
        var bhkarr = formDataGet.hspropertyBhk.split(',');
      }
    
      var formData = new FormData();
      formData.append('object', 'Project')
      formData.append('device', 'desktop')
      formData.append('obj_key', formDataGet.hspropertyKey)
      formData.append('seeker_name', (localStorage.getItem('virtual_username')!='')?localStorage.getItem('virtual_username'):'visitor')
      formData.append('seeker_email', (localStorage.getItem('virtual_email')!='')?localStorage.getItem('virtual_email'):localStorage.getItem('virtual_mobile')+"@homeonline.com")
      formData.append('seeker_mobile', localStorage.getItem('virtual_mobile'))
      formData.append('site_visit', "0")
      formData.append('obj_position', 0)
      formData.append('sharing_allowed', 1)
      formData.append('country_code', 'in')
      formData.append('page_name', 'govirtual')
      formData.append('obj_type_id', formDataGet.hspropertyUnitId)
      formData.append('obj_bhk', JSON. stringify(bhkarr))
      formData.append('utm_source', '')
      formData.append('utm_medium', '')
      formData.append('utm_campaign', '')
      formData.append('referrer', 'www.google.com')
      formData.append('device_id', '')
      formData.append('authorization',localStorage.getItem('virtual_token'))
      axios.post('enquiry/save_enquiry', formData)
        .then(res => {
          if (res.data.response_code == 200) { 
            console.log('task submmitted')
            Toast.fire({
              icon: 'success',
              title: 'Save Interest Successfully.'
            })
          } else {
            commit('updateErr',res.data.response_desc)
          }
        })
        .catch(error => console.log(error))

    }
  },
  getters: {
    signupSigninStep (state) {
      return state.step
    },
    recentmobile (state) {
      return state.mobilenumber
    },
    getmenu (state) {
      return state.showmenu
    },
    getParticipant (state) {
      return state.participant
    },
    getupdateErr (state) {
      return state.loginerr
    },
    getdashboardPlatinum(state) {
      return state.dashboardPlatinum
    },
    getdashboardGold(state) {
      return state.dashboardGold
    },
    getdashboardSilver(state) {
      return state.dashboardSilver
    },
    getProject (state) {
      return state.project
    },
    getStallnfo (state) {
      return state.stalllList
    },
    getUserUnitList(state) {
      return state.userUnitList
    },
    getPopUpBuilderName(state) {
      return state.PopUpBuilderName
    },
    getLoading(state) {
      return state.Loading
    }
    ,
    getOtpCount(state) {
      return state.otpNumber
    }
  }
})