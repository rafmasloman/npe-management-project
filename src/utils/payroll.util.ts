export const salaryPercent = (projectPrice: number, salary: number) => {
  const newSalary = (projectPrice * salary) / 100;
  console.log(newSalary);
  return newSalary;
};
