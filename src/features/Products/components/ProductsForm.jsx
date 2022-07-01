import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Typography, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputField from '../../../components/formControls/InputField'
import SelectField from '../../../components/formControls/SelectField'
import categoriesApi from '../../../api/categoriesApi'
import { colors, styles } from '../../../utils/common'
import { orange, grey } from '@mui/material/colors'
import UploadImageField from '../../../components/formControls/UploadImageField'
import colorsApi from '../../../api/colorsApi'
import stylesApi from '../../../api/stylesApi'
import TextAreaField from '../../../components/formControls/TextAreaField'

ProductsForm.propTypes = {}

function ProductsForm({ values, onSubmit = null }) {
    const [categoryList, setCategoryList] = useState([])
    const [colorList, setColorList] = useState([])
    const [styleList, setStyleList] = useState([])

    useEffect(() => {
        const getAllCategory = async () => {
            try {
                const { categories } = await categoriesApi.getAll()
                const { colors } = await colorsApi.getAll()
                const { styles } = await stylesApi.getAll()

                const newCategoriesGetName = categories.map((x) => x.name)
                const newColorsGetName = colors.map((x) => x.name)
                const newStylesGetName = styles.map((x) => x.name)

                setCategoryList(newCategoriesGetName)
                setColorList(newColorsGetName)
                setStyleList(newStylesGetName)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getAllCategory()
    }, [])

    const schema = yup
        .object()
        .shape({
            name: yup
                .string()
                .required('Please enter name of product')
                .test(
                    'at-least-two-words',
                    'Please enter name at least two words',
                    (value) => value.split(' ').filter((x) => !!x && x.length >= 3).length >= 1
                ),
            description: yup.string().required('Please enter description'),
            image: yup
                .mixed()
                .required('Please choose image url')
                .test(
                    'is-valid-image',
                    'The image must be file size less than 4000000 or an url',
                    (value) => {
                        return (
                            typeof value === 'string' ||
                            typeof value === 'object' ||
                            value.size <= 4000000
                        )
                    }
                ),
            originalPrice: yup
                .number()
                .required('Please enter original price')
                .min(500, 'Please enter original price greater than 500')
                .typeError('Please enter a number'),
            promotionPercent: yup.number().typeError('Please enter a number'),
            category: yup.string().required('Please choose a category'),
            color: yup.string().required('Please choose a color'),
            style: yup.string().required('Please choose a style'),
        })
        .required()

    const form = useForm({
        defaultValues: {
            name: values.name,
            description: values.description,
            image: values.image,
            originalPrice: values.originalPrice,
            salePrice: values.salePrice,
            promotionPercent: values.promotionPercent,
            category: values.category,
            color: values.color,
            style: values.style,
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        if (!onSubmit) return
        try {
            console.log(values)
            const newValues = {
                ...values,
                salePrice: Number.parseInt(
                    Number.parseInt(values.originalPrice) -
                        (Number.parseInt(values.originalPrice) *
                            Number.parseInt(values.promotionPercent)) /
                            100
                ),
            }

            await onSubmit(newValues)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Box>
            <Typography
                variant="h5"
                component="h2"
                textAlign="center"
                textTransform="uppercase"
                fontWeight={600}
                color={`${grey[700]}`}
            >
                {values.name !== '' ? 'Update' : 'Add'} product
            </Typography>
            <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
                <Box mb="20px">
                    <InputField name="name" form={form} label="Name" placeholder="Enter name" />
                    <TextAreaField
                        name="description"
                        form={form}
                        label="Description"
                        placeholder="Enter description"
                    />
                    {/* <InputField
                        name="image"
                        form={form}
                        label="Image"
                        placeholder="Enter image url"
                    /> */}
                    <InputField
                        name="originalPrice"
                        form={form}
                        label="Original Price"
                        placeholder="Enter original price"
                    />
                    <InputField
                        name="promotionPercent"
                        form={form}
                        label="Promotion Percent"
                        placeholder="Enter promotion percent"
                    />
                    <SelectField name="category" label="Category" form={form} data={categoryList} />
                    <SelectField name="color" label="Color" form={form} data={colorList} />
                    <SelectField name="style" label="Style" form={form} data={styleList} />
                    <UploadImageField name="image" form={form} label="Image" />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        p: '10px',
                        fontSize: '1.1rem',
                        backgroundColor: orange[400],
                        '&:hover': {
                            backgroundColor: orange[700],
                        },
                    }}
                >
                    {values.name !== '' ? 'Update' : 'Add'}
                </Button>
            </Box>
        </Box>
    )
}

export default ProductsForm
