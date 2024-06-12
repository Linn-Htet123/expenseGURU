"use client";
import WithSuspense from "@/components/common/withSuspense";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormField } from "@/components/common/formField";
import { Input } from "@/components/ui/input";
import { CategoryType, createValidation } from "@/validations/category/create";
import { Label } from "@/components/ui/label";

const Category = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full flex-1 z-10 flex flex-col items-center justify-start">
        <Image src={Bg} alt="background" className="w-screen" priority />
        <WithSuspense>
          <CategoryList />
        </WithSuspense>
      </div>
    </div>
  );
};

const DialogBox = ({ trigger }: { trigger: React.ReactNode }) => {
  const handleSubmit = (values: CategoryType) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[90%] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={toFormikValidationSchema(createValidation)}
          onSubmit={handleSubmit}
        >
          <Form className="">
            <div className="">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <FormField
                as={Input}
                id="name"
                name="name"
                type="text"
                placeholder="Add category..."
                className="col-span-3"
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Add Category</Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

const CategoryList = () => {
  return (
    <div className="h-[92%] w-full bg-slate-50 absolute bottom-0 rounded-t-[30px] px-4 py-5 flex flex-col items-center justify-start">
      <div className="flex justify-center w-[90%]">
        <DialogBox trigger={<Button>Add Category</Button>} />
      </div>
      <ScrollArea className="grow w-full mt-5 pb-14">
        {[...Array(10)].map((_, index) => (
          <Card key={index} className="w-full mb-3">
            <CardContent className="flex justify-between items-center p-3">
              <p className="font-medium">Gym</p>
              <Popover>
                <PopoverTrigger asChild>
                  <button>
                    <DotsVerticalIcon fontSize={30} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-24 mr-4 py-2 px-2">
                  <div className="flex items-center text-red-700">Delete</div>
                  <div className="flex items-center font-light mt-2 text-slate-700">
                    Edit
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Category;
