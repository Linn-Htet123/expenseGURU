"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import { Button } from "@/components/ui/button";
import SegmentedControl from "@/components/ui/segmented-button";
import { Label } from "@/components/ui/label";
import { Form, Formik, FormikHelpers } from "formik";
import {
  TransactionType,
  TransactionValidation,
} from "@/validations/income-expense";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormField } from "@/components/common/formField";
import { Input } from "@/components/ui/input";
import SelectBox from "@/components/common/select";
import { TransactionTab } from "@/enums/transactionTab";
import { useTransaction } from "@/hooks/useTransaction";
import { useTab } from "@/hooks/useTab";
import WithSuspense from "@/components/common/withSuspense";
import AddIcon from "../../../../../public/footerIcon/add-icon.svg";
import Link from "next/link";
import { Route } from "@/enums/route";
import { getMobileRoute } from "@/utils/frontend/route";
import { useCategory } from "@/hooks/useCategory";

const Add = () => {
  return (
    <div className="pt-10 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 h-auto">
        <Image src={Bg} alt="background image" className="w-screen" />
        <div className="relative bottom-[100px] w-[90%] py-5 px-3 mx-auto shadow-md rounded-3xl bg-white">
          <WithSuspense>
            <TransactionForm />
          </WithSuspense>
        </div>
      </div>
    </div>
  );
};

const TransactionForm = () => {
  const { createTransaction } = useTransaction();
  const { categories, fetchMore, hasMore } = useCategory();
  const { handleTabChange, currentTab, currentParams } = useTab();

  const [initialValues, setInitialValues] = useState<TransactionType>({
    category: "",
    amount: "",
  });

  const handleSubmit = async (
    values: TransactionType,
    { resetForm }: FormikHelpers<TransactionType>,
  ) => {
    await createTransaction(values);
    setInitialValues({ category: "", amount: "" });
    resetForm();
  };

  const getButtonText = () => {
    return currentParams === TransactionTab.EXPENSE
      ? TransactionTab.EXPENSE
      : TransactionTab.INCOME;
  };

  useEffect(() => {
    setInitialValues({ category: "", amount: "" });
  }, [currentParams]);

  return (
    <>
      <SegmentedControl
        currentTab={currentTab}
        data={[TransactionTab.INCOME, TransactionTab.EXPENSE]}
        onSelectionChange={handleTabChange}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(TransactionValidation)}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="px-4 mt-4 w-full flex flex-col gap-3">
            <span className="flex justify-between items-center">
              <Label htmlFor="category">
                <span>Category</span>
              </Label>
              <Link
                href={getMobileRoute(Route.CATEGORY)}
                className="p-1 rounded-full bg-[#2f7e79] w-[23px]"
              >
                <Image src={AddIcon} alt="add icon" />
              </Link>
            </span>

            <FormField
              as={SelectBox}
              name="category"
              id="category"
              placeholder="Select Category ..."
              options={categories}
              fetchMore={fetchMore}
              hasMore={hasMore}
              dataLength={categories.length}
            />
          </div>
          <div className="px-4 mt-4 w-full flex flex-col gap-3">
            <Label htmlFor="category">
              <span>Amount</span>
            </Label>
            <FormField
              as={Input}
              name="amount"
              type="text"
              id="amount"
              isMoneyInput={true}
              defaultValue={1000}
              placeholder="4,000"
            />
          </div>
          <div className="px-4 mt-4 w-full flex flex-col gap-3">
            <Button type="submit">Add {getButtonText()}</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Add;
