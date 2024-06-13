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
import DeleteModal from "@/components/common/deleteModal";

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

const CategoryDialogBox = ({
  trigger,
  isEditDialog = false,
  editItem,
}: {
  trigger: React.ReactNode;
  isEditDialog?: boolean;
  editItem?: {
    name: string;
    id: number;
    type: string;
  };
}) => {
  const getActionLabel = () => {
    return isEditDialog ? "Edit Category" : "Add Category";
  };
  const handleSubmit = (values: CategoryType) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[90%]">
        <DialogHeader>
          <DialogTitle>{getActionLabel()}</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            name: editItem?.name || "",
          }}
          validationSchema={toFormikValidationSchema(createValidation)}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <Label htmlFor="name" className="mb-3">
                Name
              </Label>
              <FormField
                as={Input}
                id="name"
                name="name"
                type="text"
                placeholder="Eg: Gym.."
                className="my-3"
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">{getActionLabel()}</Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

const CategoryList = () => {
  const categories = [
    {
      id: 1,
      name: "Groceries",
      type: "expense",
    },
    {
      id: 2,
      name: "Rent",
      type: "expense",
    },
    {
      id: 3,
      name: "Utilities",
      type: "expense",
    },
    {
      id: 4,
      name: "Entertainment",
      type: "expense",
    },
    {
      id: 5,
      name: "Transportation",
      type: "expense",
    },
    {
      id: 6,
      name: "Healthcare",
      type: "expense",
    },
    {
      id: 7,
      name: "Dining Out",
      type: "expense",
    },
    {
      id: 8,
      name: "Education",
      type: "expense",
    },
    {
      id: 9,
      name: "Insurance",
      type: "expense",
    },
    {
      id: 10,
      name: "Savings",
      type: "income",
    },
  ];
  return (
    <div className="h-[92%] w-full bg-slate-50 absolute bottom-0 rounded-t-[30px] px-4 py-5 flex flex-col items-center justify-start">
      <div className="flex justify-center w-[90%]">
        <CategoryDialogBox trigger={<Button>Add Category</Button>} />
      </div>
      <ScrollArea className="grow w-full mt-5 pb-14">
        {categories.slice(0, 10).map((category) => (
          <Card key={category.id} className="w-full mb-3">
            <CardContent className="flex justify-between items-center p-3">
              <p className="font-medium">{category.name}</p>
              <Popover>
                <PopoverTrigger asChild>
                  <button>
                    <DotsVerticalIcon fontSize={30} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-24 mr-4 py-2 px-2">
                  <div>
                    <DeleteModal
                      asMobile
                      trigger={
                        <span className="flex items-center text-red-700 cursor-pointer">
                          Delete
                        </span>
                      }
                      onCancel={() => {
                        console.log("cancel");
                      }}
                      onDelete={() => {
                        console.log("delete");
                      }}
                    />
                  </div>
                  <div>
                    <CategoryDialogBox
                      isEditDialog
                      editItem={category}
                      trigger={
                        <span className="flex items-center font-light mt-2 text-slate-700 cursor-pointer">
                          Edit
                        </span>
                      }
                    />
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
