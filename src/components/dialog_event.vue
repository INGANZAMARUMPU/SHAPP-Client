<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Evenement</h3>
      <div class="content">
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Invoice Type</ion-label>
          <ion-select
            multiple="false"
            @IonChange="invoice_type=$event.target.value"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="FN">
              Facture normale
            </ion-select-option>
            <ion-select-option value="RC">
              Remboursement caution
            </ion-select-option>
            <ion-select-option value="RHF">
              Réduction Hors Facture
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">VAT Taxpayer</ion-label>
          <ion-select
            multiple="false"
            @IonChange="vat_taxpayer=$event.target.value"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="0">
              Non assujetti à la TVA
            </ion-select-option>
            <ion-select-option value="1">
              Assujetti à la TVA
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">CT Taxpayer</ion-label>
          <ion-select
            multiple="false"
            @IonChange="ct_taxpayer=$event.target.value"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="0">
              Non Assujetti à la taxe de consommation
            </ion-select-option>
            <ion-select-option value="1">
              Assujetti à la taxe de consommation
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">TL Taxpayer</ion-label>
          <ion-select
            multiple="false"
            @IonChange="tl_taxpayer=$event.target.value"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="0">
              Non Assujetti au prélèvement forfaitaire libératoire
            </ion-select-option>
            <ion-select-option value="1">
              Assujetti au prélèvement forfaitaire libératoire
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Payment Type</ion-label>
          <ion-select
            multiple="false"
            @IonChange="payment_type=$event.target.value"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="1">
              en espèce
            </ion-select-option>
            <ion-select-option value="2">
              banque
            </ion-select-option>
            <ion-select-option value="3">
              à crédit
            </ion-select-option>
            <ion-select-option value="4">
              autres
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Invoice Currency</ion-label>
          <ion-select
            multiple="false"
            @IonChange="invoice_currency=$event.target.value"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="BIF">
              Franc Burundais
            </ion-select-option>
            <ion-select-option value="USD">
              United State Dollar
            </ion-select-option>
            <ion-select-option value="EUR">
              EURO
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Customer Name</ion-label>
          <ion-input type="text" 
            placeholder="Customer Name"
            @IonChange="customer_name=$event.target.value"
            :value="customer_name" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Customer TIN</ion-label>
          <ion-input type="text" 
            placeholder="Customer TIN"
            @IonChange="customer_TIN=$event.target.value"
            :value="customer_TIN" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Customer Address</ion-label>
          <ion-input type="text" 
            placeholder="Customer Address"
            @IonChange="customer_address=$event.target.value"
            :value="customer_address" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">VAT Customer Payer</ion-label>
          <ion-select
            multiple="false"
            @IonChange="vat_customer_payer=$event.target.value"
            cancel-text="laisser" ok-text="valider">
            <ion-select-option value="0">
              Non assujetti à la TVA
            </ion-select-option>
            <ion-select-option value="1">
              assujetti à la TVA
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Cancelled Invoice ref</ion-label>
          <ion-input type="text" 
            placeholder="Cancelled Invoice ref"
            @IonChange="cancelled_invoice_ref=$event.target.value"
            :value="cancelled_invoice_ref" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Invoice ref</ion-label>
          <ion-input type="text" 
            placeholder="Invoice ref"
            @IonChange="invoice_ref=$event.target.value"
            :value="invoice_ref" clearInput/>
        </ion-item>
      </div>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          ANULLER
        </ion-button>
        <ion-button fill=clear @click="save">VALIDER</ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    active:{type:Boolean, required:true},
    item:{type:Object, required:false},
    inital:{type:Object, required:true},
  },
  data(){
    return {
      invoice_type: "",
      vat_taxpayer: "",
      ct_taxpayer: "",
      tl_taxpayer: "",
      vat_taxpayer: "",
      ct_taxpayer: "",
      tl_taxpayer: "",
      payment_type: "",
      invoice_currency: "",
      customer_name: "",
      customer_TIN: "",
      customer_address: "",
      vat_customer_payer: "",
      cancelled_invoice_ref: "",
      invoice_ref: ""
    }
  },
  watch:{
    item(new_val){
      if(!!new_val){
      } else {
      }
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    save(){
    }
  }
};
</script>
<style scoped>
.options{
  padding-bottom: 0;
}
.ion-padding{
  padding-bottom: 5px;
}
.body{
  max-height: 80vh;
  overflow-y: hidden;
}
.content{
  height: calc(80vh - 100px);
  overflow-y: auto;
}
</style>