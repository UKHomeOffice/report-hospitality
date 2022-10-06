const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

///// NAVIGATION ROUTES START /////
router.post("/for-someone-else-redirect", (req, res) => {
  let forSomeoneElse = req.session.data["for-someone-else"]

  if (forSomeoneElse == undefined) {
    res.redirect("hospitality/hospitality-for-someone-else-error")
  } else {
    res.redirect("hospitality/reporting")
  }
})

router.post("/reporting-redirect", (req, res) => {
  let reporting = req.session.data["reporting"]
  let forSomeoneElse = req.session.data["for-someone-else"]

  if (reporting == undefined) {
    res.redirect("hospitality/reporting-error")
  } else if (reporting != undefined && forSomeoneElse == "yes") {
    res.redirect("hospitality/on-behalf-of")
  } else if (reporting != undefined && forSomeoneElse == "no") {
    res.redirect("hospitality/decision")
  }
})

router.post("/on-behalf-of-redirect", (req, res) => {
  let hospitalityOnBehalfOf = req.session.data["on-behalf-of"]

  if (hospitalityOnBehalfOf == "individual") {
    res.redirect("hospitality/employee-lookup")
  } else {
    res.redirect("hospitality/someone-else-details")
  }
})

router.post("/employee-lookup-redirect", (req, res) => {
  let employeeLookup = req.session.data["employee-lookup"]
  let employeeName = req.session.data["employee-name"]
  let employeeEmail = req.session.data["employee-email"]
  let employeeCCC = req.session.data["employee-cost-centre-code"]

  if (employeeLookup == "" && (employeeName == "" || employeeEmail == "" || employeeCCC == "")) {
    res.redirect("hospitality/employee-lookup-error")
  } else {
    res.redirect("hospitality/decision")
  }
})

router.post("/someone-else-details-redirect", (req, res) => {
  let name = req.session.data["team-unit-or-department-name"]
  let homeOfficeRepresentativeLookup = req.session.data["home-office-representative-lookup"]

  if (name == "" && homeOfficeRepresentativeLookup == "") {
    res.redirect("hospitality/someone-else-details-error")
  } else {
    res.redirect("hospitality/decision")
  }
})

router.post("/event-details-redirect", (req, res) => {
  let reporting = req.session.data["reporting"]
  let forSomeoneElse = req.session.data["for-someone-else"]

  if ((reporting == "hospitality-received" && forSomeoneElse == "no") || (reporting == "hospitality-offered")) {
    res.redirect("hospitality/event-attendance")
  } else {
    res.redirect("hospitality/type-of-hospitality")
  }
})

router.post("/hospitality-details-redirect", (req, res) => {
  let reporting = req.session.data["reporting"]
  let forSomeoneElse = req.session.data["for-someone-else"]

  if (reporting == "hospitality-received" && forSomeoneElse == "no") {
    res.redirect("hospitality/summary")
  } else if (reporting == "hospitality-received" && forSomeoneElse == "yes") {
    res.redirect("hospitality/delegated-authority-approval")
  } else {
    res.redirect("hospitality/approved-supplier")
  }
})

router.post("/approved-supplier-redirect", (req, res) => {
  let approvedSupplierUsed = req.session.data["approved-supplier-used"]
  let forSomeoneElse = req.session.data["for-someone-else"]

  if (approvedSupplierUsed == "yes" && forSomeoneElse == "yes") {
    res.redirect("hospitality/delegated-authority-approval")
  } else if (approvedSupplierUsed == "yes" && forSomeoneElse == "no") {
    res.redirect("hospitality/summary")
  } else if (approvedSupplierUsed == "no" && forSomeoneElse == "yes") {
    res.redirect("hospitality/delegated-authority-approval")
  } else if (approvedSupplierUsed == "no" && forSomeoneElse == "no") {
    res.redirect("hospitality/summary")
  }
})

router.post("/delegated-authority-approval-redirect", (req, res) => {
  let delegatedAuthorityApproval = req.session.data["delegated-authority-approval"]
  if (delegatedAuthorityApproval == "yes") {
    res.redirect("hospitality/approver-lookup")
  } else {
    res.redirect("hospitality/summary")
  }
})

module.exports = router
