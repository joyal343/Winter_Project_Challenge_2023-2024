"use client"

import DropdownMobile from "@components/DropdownMobile";

const page = () => {
  const filterOptions = {
    Date: [
      "All Date",
      "Last 30 Days",
      "Last 60 Days",
      "Last 6 Months",
      "Last 12 Months",
    ],
    Category: [
      "Academic",
      "Clubs",
      "Sports",
      "Research",
      "Employment",
      "Tenders",
    ],
    Department: ["CSE", "ECE", "EEE", "MCE", "CVE"],
  };
  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
  };
  return <div>
    <DropdownMobile
      filterOptions = {filterOptions}
      handleSearch={handleSearch}
    />
  </div>
}

export default page