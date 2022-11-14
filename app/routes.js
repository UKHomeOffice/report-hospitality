const e = require('express')
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

function getFormattedDate(unformattedDate) {
  let date = new Date(unformattedDate)
  let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return date.getDate() + " " + monthName[date.getMonth()] + " " + date.getFullYear()
}

router.post("/event-details-redirect", (req, res) => {
  let eventDate = req.session.data["event-date"]
  let reporting = req.session.data["reporting"]
  let reporter = req.session.data["reporter"]

  if (eventDate != "") req.session.data["formatted-event-date"] = getFormattedDate(eventDate)

  if (reporting == "hospitality-received" && reporter == "me") {
    res.redirect("hospitality/alone-or-accompanied")
  } else if (reporting == "hospitality-offered") {
    res.redirect("hospitality/event-more-details")
  } else {
    res.redirect("hospitality/type-of-hospitality")
  }
})

router.post("/type-of-hospitality-redirect", (req, res) => {
  let hospitalityType = req.session.data["hospitality-type"]

  if (hospitalityType == undefined) {
    res.redirect("hospitality/type-of-hospitality-error")
  } else {
    res.redirect("hospitality/hospitality-details")
  }
})

function costOfHospitality(req) {
  let foodCost = parseFloat(req.session.data["food-cost"]) || 0
  let drinksCost = parseFloat(req.session.data["drinks-cost"]) || 0
  let transportCost = parseFloat(req.session.data["transport-cost"]) || 0
  let entertainmentCost = parseFloat(req.session.data["entertainment-cost"]) || 0
  let accommodationCost = parseFloat(req.session.data["accommodation-cost"]) || 0

  let totalCost = 0

  if (req.session.data["hospitality-type"].includes("food")) totalCost += foodCost
  if (req.session.data["hospitality-type"].includes("drinks")) totalCost += drinksCost
  if (req.session.data["hospitality-type"].includes("transport")) totalCost += transportCost
  if (req.session.data["hospitality-type"].includes("entertainment")) totalCost += entertainmentCost
  if (req.session.data["hospitality-type"].includes("accommodation")) totalCost += accommodationCost

  return totalCost.toFixed(2)
}

router.post("/hospitality-details-redirect", (req, res) => {
  let reporting = req.session.data["reporting"]

  req.session.data["total-cost-of-hospitality"] = costOfHospitality(req)

  if (reporting == "hospitality-received") {
    res.redirect("hospitality/delegated-authority-approval")
  } else {
    res.redirect("hospitality/approved-supplier")
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
