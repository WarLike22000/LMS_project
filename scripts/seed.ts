const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "علوم کامپیوتر" },
        { name: "موسیقی" },
        { name: "ورزشی" },
        { name: "عکاسی" },
        { name: "حسابداری" },
        { name: "مهندسی" },
        { name: "فیلم برداری" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();