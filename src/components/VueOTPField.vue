<template>
  <div class="vue-otp-container" :style="{ 'gridTemplateColumns': `repeat(${amount}, 1fr)` }">
    <div v-for="(number, index) in amount" :key="index" class="vue-otp-wrapper">
      <input class="input text-center" :type="type" :maxlength="max" :placeholder="placeholder" @keyup="isNumber($event, index)" autocomplete="off" @focusin="onFocusIn($event, index)" >
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFieldCompleted: false
    }
  },
  props: {
    max: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: 'tel'
    },
    placeholder: {
      type: String,
      default: ''
    },
    amount: {
      type: Number,
      default: 4
    },
    onFieldCompleted: {
      type: Function,
      default: () => {}
    },
    onFill: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onFocusIn (e, index) {
      const otpFields = document.querySelectorAll('.text-center')
      otpFields[index].value = ''
    },
    isNumber: function (e, index) {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      const otpFields = document.querySelectorAll('.text-center')
      otpFields[index].setSelectionRange(0, 1)
      const selObj = window.getSelection()
      const selectedText = selObj.toString()
      const selectedValue = parseInt(selectedText, 10)
      if (numbers.indexOf(selectedValue) > -1) {
        otpFields[index].value = selectedValue
        if (index !== 3) {
          otpFields[index + 1].focus()
          otpFields[index + 1].value = ''
        }
      }
      if (selectedText === '') {
        otpFields[index].value = ''
        if (index !== 0) {
          otpFields[index - 1].focus()
          otpFields[index - 1].value = ''
        }
      }
      const inputValues = []
      otpFields.forEach((field) => {
        inputValues.push(field.value)
      })
      const isFieldsComplete = inputValues.every(value => value !== '')
      this.onFill({
        isFieldsComplete,
        currentValue: inputValues[index],
        values: inputValues.join('')
      })
      if (index === 3 && isFieldsComplete) {
        const values = inputValues.join('')
        this.onFieldCompleted(values)
      }
    }
  }
}
</script>


<style>
  .vue-otp-container {
    display: grid;
    align-items: center;
    justify-content: center;
  }
  .vue-otp-wrapper {
    display: flex;
    padding-left: 5px;
    padding-right: 5px;
  }


</style>