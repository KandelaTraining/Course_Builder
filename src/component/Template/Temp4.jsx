import React, { useState } from 'react'
import { Preview } from '../../shared'
import dynamic from 'next/dynamic'
import { useCreateSlideMutation,useCreateTestSlideMutation } from '../../../redux/slices/slide'
import { motion } from 'framer-motion'
import MCQ from "./util/MCQ"

const QullEditor = dynamic(import("react-quill"), {
    ssr: false,
})

const Temp4 = ({ lessonId, toast, onAddSlide, isTest }) => {

    const [subText, setSubText] = useState(null)
    const [addSlide] = useCreateSlideMutation()
    const [addTestSlide] = useCreateTestSlideMutation()
    const [mark, setMark] = useState(0)

    const [option, setOption] = useState([])
    const [correctOpt, setCorrectOpt] = useState([])

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const removeUndifined = correctOpt.filter((item) => item !== undefined)
        const isAllOption = option.filter((item) => item.val === "")

        if (!subText) {
            return toast.error("Please Add Paragraph")
        } else if (isAllOption?.length !== 0) {
            return toast.error("Please Add All Option")
        } else if (removeUndifined?.length === 0) {
            return toast.error("Please Select Correct Option")
        }

        if (!isTest) {

            addSlide({ id: lessonId, data: { question: subText, type: 4, options: option, correct_options: correctOpt.filter(item => item !== undefined), mcq_type: "checkbox" } }).unwrap().then((res) => {
                onAddSlide({ ...res.data, slideno: 3 })
                toast.success("Slide Added")
            }).catch((err) => {
                toast.error("Error Occured")
                console.log("Err", err)
            })
        } else {
            addTestSlide({ id: lessonId, data: { question: subText, type: 4, options: option, correct_options: correctOpt.filter(item => item !== undefined), mcq_type: "radio", mark } }).unwrap().then(res => {
                onAddSlide({ ...res.data, slideno: 3,added:true })
                toast.success("Test Slide Added")
            }).catch((err) => {
                toast.error("Error Occured")
                console.log("Err", err)
            })
        }
    }


    return (
        <>
            <form className="course__builder-temp1" onSubmit={onSubmitHandler}>
                <div className="item quil_small" >
                    <p>Question/Prompt</p>
                    <QullEditor onChange={(data) => setSubText(data)} theme="snow" placeholder='Enter Your Question' />
                </div>
                <div className="item">
                    <MCQ isMulti={true} setQuestion={setOption} setAnswer={setCorrectOpt} setMark={setMark} isTest={isTest} />
                </div>
                <motion.button className="save__btn" type='submit' whileTap={{ scale: .97 }}>
                    <h3>Save</h3>
                </motion.button>
            </form>
            <Preview type={3} data={{ question: subText, option, correct: correctOpt.filter((item) => item !== undefined),isTest }} />
        </>
    )
}

export default Temp4