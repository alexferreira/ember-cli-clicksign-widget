import Ember from 'ember';

const { Component, Evented, getOwner, computed, } = Ember;

export default Component.extend(Evented, {
  key: null,
  width: 900,
  height: 800,
  email: null,
  display_name: null,
  birthday: null,
  documentation: null,
  process_signer: function(){
    let signer = this.getProperties('email', 'display_name', 'documentation', 'birthday');

    for(var key in signer){
      if(!signer[key]){ delete signer[key]; }
    }

    return signer;
  },
  host: computed(function(){
    var applicationConfig = getOwner(this).resolveRegistration('config:environment');
    return applicationConfig.environment === "production" ? "widget.clicksign.com" : "widget.clicksign-demo.com";
  }),
  didInsertElement: function(){
    clicksign.configure({
      container: this.elementId,
      key: this.get('key'),
      protocol: "https",
      host: this.get("host"),
      signer: this.process_signer(),
      width: this.get('width'),
      height: this.get('height'),
      callback: event => this.trigger('clickSignEvent', event)
    });
  }
});
