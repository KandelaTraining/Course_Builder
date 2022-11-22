import React, { useState } from 'react'
import { Preview } from '../../shared'
import dynamic from 'next/dynamic'
import { useCreateSlideMutation, useAddSlideInLogicMutation, useUpdateSlideMutation } from '../../../redux/slices/slide'
import { motion } from 'framer-motion'
import MCQ from "./util/MCQ"
import { useEffect } from 'react'
import { setLogicJump,updateLogicJump } from '../../../redux/slices/util'
import { useDispatch, useSelector } from 'react-redux'

const QullEditor = dynamic(import("react-quill"), {
    ssr: false,
})

const Temp12 = ({ lessonId, toast, onAddSlide, order, update, onSlideUpdateHandler, isTest = false, isLogicJump }) => {

    const isUpdate = update?.is
    const [subText, setSubText] = useState(isUpdate ? update.data.question : "")
    const [addSlide] = useCreateSlideMutation()


    const [option, setOption] = useState([])
    const [correctOpt, setCorrectOpt] = useState([])
    

    const [updateSlide] = useUpdateSlideMutation()
    
    const dispatch = useDispatch()

    const [addSlideInLogic] = useAddSlideInLogicMutation()
    const { logicJump,updateLogicSlide } = useSelector(state => state.util)

    const [logicJumpId, setLogicJumpId] = useState(null)

    useEffect(() => {
        
    }, [])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const isAllOption = option.filter((item) => item.val === "")

        if (!subText) {
            return toast.error("Please Add Paragraph")
        } else if (isAllOption?.length !== 0) {
            return toast.error("Please Add All Option")
        }

        if (isLogicJump.is === "true") {
            const mainId=logicJump.find((item)=>parseInt(item.logic_jump.level)===1)
            addSlideInLogic({ id: isLogicJump.logicJumpId,level:{is:true,lesson:mainId._id}, logicId: logicJumpId, data: { question: subText, type: 9, logic_jump: {arr:option,level:logicJump.length+1}, mcq_type: "radio", builderslideno: 11, order } }).unwrap().then((res) => {
                dispatch(setLogicJump(res.slide))
                onAddSlide({ ...res.slide, slideno: 11 })
                isLogicJump.handler(res.slide)
                toast.success("Slide Added")
            }).catch((err) => {
                toast.error("Error Occured")
                console.log("Err", err)
            })
            return
        }

        addSlide({ id: lessonId, data: { question: subText, type: 9, logic_jump: {arr:option,level:1}, mcq_type: "radio", builderslideno: 11, order } }).unwrap().then(async (res) => {
            dispatch(setLogicJump(res.data))
            toast.success("Slide Added")
            onAddSlide({ ...res.data, slideno: 11 }, true)
        }).catch((err) => {
            toast.error("Error Occured")
            console.log("Err", err)
        })
    }

    const onUpdateHandler = (e) => {
        e.preventDefault()
        
        updateSlide({ id: updateLogicSlide.is ? updateLogicSlide.logic_jump_id : update?.id, data: { question: subText, logic_jump:{arr:option,level: update.data.logic_jump.level}, correct_options: correctOpt.filter(item => item !== undefined) } }).unwrap().then((res) => {
            dispatch(updateLogicJump({id:update?.id,data:res.data}))
            onSlideUpdateHandler(update?.id, res.data)
            toast.success("Slide updated")
        }).catch((err) => {
            toast.error("Error Occured")
            console.log("Err", err)
        })

    }
    const isLogicJumpArr = logicJump.find((item) => item._id === isLogicJump.logicJumpId)

    console.log({logicJump,isLogicJump})

    return (
        <>
            <form className="course__builder-temp1" onSubmit={!isUpdate ? onSubmitHandler : onUpdateHandler}>
                <div className="item quil_small" >
                    <p>Question/Prompt</p>
                    <QullEditor onChange={(data) => setSubText(data)} theme="snow" placeholder='Enter Your Question' defaultValue={isUpdate ? update?.data?.question : null} />
                </div>
                <div className="item">
                    <MCQ isMulti={false} setQuestion={setOption} setAnswer={setCorrectOpt} isTest={isTest} update={update} isLogicJump={true} />
                </div>
                {
                    isLogicJump.is && (
                        <div className="item logic_jump">
                            <p>Select where to add this slide in Logic Jump Option </p>
                            <div className="logic_jump-option">
                                {isLogicJumpArr?.logic_jump.arr.map((item) => (
                                    <h3 key={item._id} onClick={() => setLogicJumpId(item._id)} className={item._id === logicJumpId ? "corr" : ""} >{item.val}</h3>
                                ))}
                            </div>
                        </div>
                    )
                }
                <motion.button className="save__btn" type='submit' whileTap={{ scale: .97 }}>
                    <h3>{isUpdate ? "Update" : "Save"}</h3>
                </motion.button>
            </form>
            <Preview type={11} data={{ question: subText, option: option.filter((item) => item.val !== ""), correct: correctOpt.filter((item) => item !== undefined)[0], isTest }} />
        </>
    )
}

export default Temp12