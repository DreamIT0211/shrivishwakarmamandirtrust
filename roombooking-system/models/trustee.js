// models/trustee.js
class Trustee {
    constructor(trustee_image, trustee_name, trustee_mobileNo, trustee_description) {
      this.trustee_image = trustee_image;
      this.trustee_name = trustee_name;
      this.trustee_mobileNo = trustee_mobileNo;
      this.trustee_description = trustee_description;
      this.trustee_title = trustee_title;
    }
  }
  
  module.exports = Trustee;