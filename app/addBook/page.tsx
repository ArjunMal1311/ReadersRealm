"use client"
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import ImageUpload from '../components/ImageUpload';
import Input from '../components/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Heading from '../components/Heading';
import { bookCategories } from '../components/ItemsList/CategoriesList';
import CategoryItem from '../components/Categories';

enum STEPS {
    CATEGORY = 0,
    INFO = 1,
    IMAGES = 2,
    DESCRIPTION = 3,
}

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            title: '',
            author: '',
            description: '',
            imageUrl: '',
            price: 1,
            stock: 1
        }
    });

    const category = watch('category');
    const imageSrc = watch('imageSrc');

    const onBack = () => {
        setStep((value) => Math.max(value - 1, STEPS.CATEGORY));
    }

    const onNext = () => {
        setStep((value) => Math.min(value + 1, Object.keys(STEPS).length - 1));
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.DESCRIPTION) {
            return onNext();
        }

        axios.post('/api/book', data).then(() => {
            toast.success('Book Added Successfully!')
            router.push("/")
            setStep(STEPS.CATEGORY)
        }).catch(() => {
            toast.error('Something went wrong.');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }


    return (
        <div className="flex justify-center mt-6 h-screen">
            <div className="w-4/5 max-w-screen-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {step === STEPS.CATEGORY && (
                        <div className='h-[75vh]'>
                            <Heading title="Step 1: Select Category" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[65vh] overflow-y-auto">
                                {bookCategories.map((item: any) => (
                                    <div key={item.label} className="col-span-1">
                                        <CategoryItem
                                            onClick={(category) => setCustomValue('category', category)}
                                            selected={category === item.label}
                                            label={item.label}
                                            icon={item.icon}
                                            description={item.description}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {step === STEPS.INFO && (
                        <div className='max-h-[75vh]'>
                            <Heading title="Step 2: About your Book!" />
                            <div className=''>
                                <div className="">Title</div>
                                <Input
                                    id="title"
                                    label="Title"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <div className="mt-4">Author</div>
                                <Input
                                    id="author"
                                    label="Author"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <div className="mt-4">Description</div>
                                <Input
                                    id="description"
                                    label="Description"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </div>
                        </div>
                    )}
                    {step === STEPS.IMAGES && (
                        <div>
                            <Heading title="Step 4: Add Pictures!" />
                            <ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc} />
                        </div>
                    )}
                    {step === STEPS.DESCRIPTION && (
                        <div className='h-max-[75vh]'>
                            <Heading title="Step 4: Add Information about your Book!" />
                            <div className=''>
                                <div className="">Stock</div>
                                <Input
                                    id="stock"
                                    label="Stock"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <div className="mt-4">Price</div>
                                <Input
                                    id="price"
                                    label="Price (in ₹)"
                                    type="number"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </div>

                        </div>
                    )}
                </form>
                <div className="flex justify-between mt-4">
                    <Button
                        label="Back"
                        onClick={onBack}
                        disabled={step === STEPS.CATEGORY}
                    />
                    <Button
                        label={step === STEPS.DESCRIPTION ? "Submit" : "Next"}
                        onClick={handleSubmit(onSubmit)}
                    />
                </div>
            </div>
        </div>

    );
}

export default Page;

