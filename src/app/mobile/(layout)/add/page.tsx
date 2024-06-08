"use client";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import { Button } from "@/components/ui/button";
import SegmentedControl from "@/components/ui/segmented-button";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";
import {
  IncomeType,
  IncomeValidation,
  ExpenseType,
  ExpenseValidation,
} from "@/validations/income-expense";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormField } from "@/components/common/formField";
import { Input } from "@/components/ui/input";
import SelectBox from "@/components/common/select";

const Add = () => {
  const handleExpenseSubmit = (values: ExpenseType) => {
    // values.category = selectValue;
    console.log(values);
  };
  return (
    <div className="pt-10 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 h-auto">
        <Image src={Bg} alt="background image" className="w-screen" />
        <div className="relative bottom-[100px] w-[90%] py-5 px-3 mx-auto shadow-md rounded-3xl bg-white">
          <SegmentedControl
            data={["Income", "Expense"]}
            onSelectionChange={(item) => {
              console.log(item);
            }}
          />
          <Formik
            initialValues={{
              category: "",
              amount: 0,
            }}
            validationSchema={toFormikValidationSchema(ExpenseValidation)}
            onSubmit={handleExpenseSubmit}
          >
            <Form>
              <div className="px-4 mt-4 w-full flex flex-col gap-3">
                <Label htmlFor="category">
                  <span>Category</span>
                </Label>
                <FormField
                  as={SelectBox}
                  name="category"
                  type="category"
                  id="category"
                  options={["School", "Gym", "Netflix"]}
                />
              </div>
              <div className="px-4 mt-4 w-full flex flex-col gap-3">
                <Label htmlFor="category">
                  <span>Amount</span>
                </Label>
                <FormField
                  as={Input}
                  name="amount"
                  type="number"
                  id="amount"
                  defaultValue={1000}
                  placeholder="4,000"
                />
              </div>
              <div className="px-4 mt-4 w-full flex flex-col gap-3">
                <Button type="submit">Add Expense</Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Add;
