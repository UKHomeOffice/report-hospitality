const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

///// NAVIGATION ROUTES START /////
router.post("/reporting-redirect", (req, res) => {
  let reporting = req.session.data["reporting"]

  if (reporting == undefined) {
    res.redirect("hospitality/reporting-error")
  } else {
    res.redirect("hospitality/select-reporter")
  }
})

router.post("/select-reporter-redirect", (req, res) => {
  let reporter = req.session.data["reporter"]

  if (reporter == "me") {
    res.redirect("hospitality/decision")
  } else if (reporter == "someone-else") {
    res.redirect("hospitality/employee-lookup")
  } else if (reporter == "team-unit-department") {
    res.redirect("hospitality/team-unit-or-department-details")
  } else {
    res.redirect("hospitality/select-reporter-error")
  }
})

router.post("/employee-lookup-redirect", (req, res) => {
  let employeeLookup = req.session.data["employee-lookup"]

  if (employeeLookup == "") {
    res.redirect("hospitality/employee-lookup-error")
  } else {
    res.redirect("hospitality/decision")
  }
})

router.post("/team-unit-or-department-details-redirect", (req, res) => {
  let name = req.session.data["team-unit-or-department-name"]
  let homeOfficeRepresentativeLookup = req.session.data["home-office-representative-lookup"]
  let reporting = req.session.data["reporting"]

  if (name == "" && homeOfficeRepresentativeLookup == "") {
    res.redirect("hospitality/team-unit-or-department-details-error")
  } else if (reporting == "hospitality-received") {
    res.redirect("hospitality/number-of-recipients")
  } else {
    res.redirect("hospitality/decision")
  }
})

router.post("/event-details-redirect", (req, res) => {
  let reporting = req.session.data["reporting"]
  let reporter = req.session.data["reporter"]

  if (reporting == "hospitality-received" && reporter == "me") {
    res.redirect("hospitality/alone-or-accompanied")
  } else if (reporting == "hospitality-offered") {
    res.redirect("hospitality/event-attendance")
  } else {
    res.redirect("hospitality/type-of-hospitality")
  }
})

router.post("/hospitality-details-redirect", (req, res) => {
  let reporting = req.session.data["reporting"]
  let reporter = req.session.data["reporter"]

  if (reporting == "hospitality-received" && reporter == "me") {
    res.redirect("hospitality/summary")
  } else if (reporting == "hospitality-received" && reporter != "me") {
    res.redirect("hospitality/delegated-authority-approval")
  } else {
    res.redirect("hospitality/approved-supplier")
  }
})

router.post("/approved-supplier-redirect", (req, res) => {
  let reporter = req.session.data["reporter"]

  if (reporter != "me") {
    res.redirect("hospitality/delegated-authority-approval")
  } else {
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
