const prisma = require("./prismaClient");

async function main() {
  console.log("Criando um curso com módulos...");

  const course = await prisma.course.create({
    data: {
      title: "Fundamentos de Node.js",
      description: "Curso introdutório sobre Node.js e Prisma ORM",
      published: true,
      modules: {
        create: [
          { title: "Introdução ao Node.js", order: 1 },
          { title: "Trabalhando com o Prisma ORM", order: 2 },
          { title: "Conectando ao PostgreSQL com Docker", order: 3 },
        ],
      },
    },
    include: {
      modules: true,
    },
  });

  console.log("Curso criado:", JSON.stringify(course, null, 2));

  console.log("\nListando todos os cursos com seus módulos...");
  const allCourses = await prisma.course.findMany({
    include: { modules: true },
  });

  console.log(JSON.stringify(allCourses, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
