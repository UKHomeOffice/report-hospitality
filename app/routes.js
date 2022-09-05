const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

///// NAVIGATION ROUTES START /////

//CDM: Skip on-behalf-of-gift.html
router.post("/individual-hospitality-redirect", (req, res) => {
  let individualHospitality = req.session.data["individual-hospitality"]
  if (individualHospitality == "yes") {
    res.redirect("hospitality/other-party-details")
  } else {
    res.redirect("hospitality/on-behalf-of-hospitality")
  }
})

//CDM: Route to employee-lookup.html or other-recipient-or-donor-details.html based on who the gift recipient/donor is
router.post("/on-behalf-of-redirect", (req, res) => {
  let hospitalityOnBehalfOf = req.session.data["on-behalf-of"]
  if (hospitalityOnBehalfOf == "employee") {
    res.redirect("hospitality/employee-lookup")
  } else {
    res.redirect("hospitality/someone-else-details")
  }
})

//CDM: 
router.post("/event-details-redirect", (req, res) => {
  let hospitalityReceivedOrOffered = req.session.data['received-or-offered']
  let individualHospitality = req.session.data["individual-hospitality"]

  if (hospitalityReceivedOrOffered == "received" && individualHospitality == "yes" || hospitalityReceivedOrOffered == "offered") {
    res.redirect("hospitality/event-attendance-details")
  } else {
    res.redirect("hospitality/type-of-hospitality")
  }
})

//CDM: 
router.post("/hospitality-details-redirect", (req, res) => {
  let hospitalityReceivedOrOffered = req.session.data['received-or-offered']

  if (hospitalityReceivedOrOffered == "received") {
    res.redirect("hospitality/hospitality-decision")
  } else {
    res.redirect("hospitality/approved-supplier")
  }
})

router.post("/hospitality-decision-redirect", (req, res) => {
  let individualHospitality = req.session.data["individual-hospitality"]

  if (individualHospitality == "yes") {
    res.redirect("hospitality/summary")
  } else {
    res.redirect("hospitality/delegated-authority-approval")
  }
})


router.post("/approved-supplier-redirect", (req, res) => {
  let approvedSupplierUsed = req.session.data["approved-supplier-used"]
  let individualHospitality = req.session.data["individual-hospitality"]

  if (approvedSupplierUsed == "yes" && individualHospitality == "no") {
    res.redirect("hospitality/delegated-authority-approval")
  } else if (approvedSupplierUsed == "yes" && individualHospitality == "yes") {
    res.redirect("hospitality/summary")
  } else if (approvedSupplierUsed == "no" && individualHospitality == "no") {
    res.redirect("hospitality/delegated-authority-approval")
  } else if (approvedSupplierUsed == "no" && individualHospitality == "yes") {
    res.redirect("hospitality/summary")
  }
})


router.post("/delegated-authority-approval-redirect", (req, res) => {
  let delegatedAuthorityApproval = req.session.data["delegated-authority-approval"]
  if (delegatedAuthorityApproval == "yes") {
    res.redirect("hospitality/approver-lookup")
  } else {
    res.redirect("hospitality/delegated-authority-disapproval-reason")
  }
})

module.exports = router
