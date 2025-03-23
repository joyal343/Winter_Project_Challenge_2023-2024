import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req){
    await addTestEntries();
    return {status:200};
}
async function addTestEntryWithOffset(offsetInDays) {
  const testEntry = await prisma.record.create({
    data: {
      title: "Test Record",
      description: "This is a test entry.",
      date: new Date(new Date().setDate(new Date().getDate() - offsetInDays)),
      type: "Sports",
      department: "CSE",
      fileLocation: "/files/test.pdf",
      imageLocation: "/images/test.jpg",
      bannerLocation: "/banners/test.jpg",
    },
  });
  console.log(`Test entry added with date offset ${offsetInDays} days:`, testEntry);
}

async function addTestEntries() {
  console.log("Creating Entries")
  await addTestEntryWithOffset(30); // 30 days before
  await addTestEntryWithOffset(60); // 60 days before
  await addTestEntryWithOffset(180); // 6 months before
  await addTestEntryWithOffset(365); // 1 year before
}

addTestEntries()
  .catch((error) => {
    console.error("Error adding test entries:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
