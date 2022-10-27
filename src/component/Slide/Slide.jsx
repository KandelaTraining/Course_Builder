import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { useRouter } from "next/router"
import { MdOutlineArrowBackIos } from "react-icons/md"
import { AiOutlinePlus } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Temp1, Temp10, Temp11, Temp2, Temp3, Temp4, Temp5, Temp6, Temp7, Temp8, Temp9 } from "../Template"
import { toast, ToastContainer } from "react-toast"
import { setSlideData } from "../../../redux/slices/util"
import { useGetSlideMutation } from "../../../redux/slices/slide"

const templateType = [
    {
        id: 0,
        name: "Text Only",
        slideno: 0,

    },
    {
        id: 1,
        name: "Short Answer Only",
        slideno: 1,
        
    },
    {
        id: 2,
        name: "SCQ Only",
        slideno: 2
    },
    {
        id: 3,
        name: "MCQ Only",
        slideno: 3
    },
    {
        id: 4,
        name: "Opinion Scale",
        slideno: 4
    },
    {
        id: 5,
        name: "Image Slider",
        slideno: 5
    },
    {
        id: 6,
        name: "Media + Heading",
        slideno: 6
    },
    {
        id: 7,
        name: "Media + Short Answer",
        slideno: 7
    },
    {
        id: 8,
        name: "Media + SCQ",
        slideno: 8
    },
    {
        id: 9,
        name: "Media + MCQ",
        slideno: 9
    },
    {
        id: 10,
        name: "Media + Text",
        slideno: 10
    },
    // {
    //     id: 11,
    //     name: "Media + Short Answer + Text",
    //     slideno: 0,
    //     comp: <Temp1 />
    // },
]

const Slide = ({ title, id, no, lessonId }) => {
    const { course, slide } = useSelector(state => state.util)
    const [showOpt, setShowOpt] = useState(false)
    const [showTemplateOpt, setShowTemplateOpt] = useState(false)
    const [currentTemplate, setCurrentTemplate] = useState({ id: null, name: null })

    const [totalSlideAdded, setTotalSlideAdded] = useState([])
    const dispatch = useDispatch()
    const router = useRouter()

    const [getSlides] = useGetSlideMutation()

    useEffect(() => {
        if (slide) {
            setTotalSlideAdded(slide)
        }

        if (slide.length === 0) {
            getSlides(lessonId).unwrap().then((res) => {
                setSlideData(res.data)
                setTotalSlideAdded(res.data)
            }).catch((err) => {
                console.log("Error Occured", err)
            })
        }

        if(router.query?.update){
            const id=parseInt(router.query.temp)
            const name=templateType.find((obj)=>obj.id===id)?.name
            setCurrentTemplate({id,name:name})
        }
    }, [])
    useEffect(() => {
    }, [dispatch, slide])

    
    useEffect(() => {
        dispatch(setSlideData(totalSlideAdded))
    }, [totalSlideAdded])

    const onTempSelectHandler = (id, name) => {
        setCurrentTemplate({ id,name })
        setShowTemplateOpt(false)
    }

    const onAddSlide = (data) => {
        setTotalSlideAdded(item => [...item, { ...data }])
    }



    const onPrevClick = () => {
        const lastSlide = slide[slide.length - 1]
        const findSlide = templateType.filter(item => item.id === lastSlide.slideno)[0]

        
        if (lastSlide) {
            setCurrentTemplate({ id: findSlide?.id, name: findSlide?.name, temp: findSlide?.comp })
        }
    }

    function renderer(id) {
        const config = {
            lessonId: lessonId,
            toast: toast,
            onAddSlide: onAddSlide,
            order: slide.length,
            update: router.query?.update ? true :false
        }
        
        switch (id) {
            case 0:
                return <Temp1 {...config} />
            case 1:
                return <Temp2 {...config} />
            case 2:
                return <Temp3 {...config} />
            case 3:
                return <Temp4 {...config} />
            case 4:
                return <Temp5 {...config} />
            case 5:
                return <Temp6 {...config} />
            case 6:
                return <Temp7 {...config} />
            case 7:
                return <Temp8 {...config} />
            case 8:
                return <Temp9 {...config} />
            case 9:
                return <Temp10 {...config} />
            case 10:
                return <Temp11 {...config} />
            default:
                return <Temp1 {...config} />
        }
    }

    console.log({currentTemplate})
    return (
        <div className="course__builder-slide">
            <ToastContainer position="bottom-left" delay={3000} />
            <div className="upper">
                <div className="course__builder-slide__title" onClick={() => setShowOpt(!showOpt)}>
                    <div className="left">
                        <h2 style={{ textTransform: "capitalize" }}>{id} {no}: &nbsp;</h2>
                        <h2>{title}</h2>
                    </div>
                    <BsChevronDown size={30} />
                    <AnimatePresence>
                        {
                            showOpt && (
                                <motion.div className="option" initial={{ scale: 0, opacity: 0 }} exit={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                    {course.structure.map((item, i) => (
                                        <Link href={`/slide/lesson?no=${i + 1}&title=${item?.name}&key=${item.isSaved}`} key={item?.name}>
                                            <div className="option__item">
                                                <h3 style={{ textTransform: "capitalize" }}>{id} {i + 1}: &nbsp;</h3>
                                                <h3>{item.name}</h3>
                                            </div>
                                        </Link>
                                    ))}
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
                <div className="course__builder-slide__template">
                    <h3>Template</h3>
                    <div className="button" onClick={() => setShowTemplateOpt(!showTemplateOpt)}>
                        <h3>{currentTemplate.name ?? "Choose A Template"}</h3>
                        <BsChevronDown size={20} />
                    </div>
                    <AnimatePresence>
                        {
                            showTemplateOpt && (
                                <motion.div className="option" initial={{ scale: 0, opacity: 0 }} exit={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                    {
                                        templateType.map(item => (
                                            <div className="option__item" key={item.id} onClick={() => onTempSelectHandler(item.id, item.name)}>
                                                <p>{item.name}</p>
                                            </div>
                                        ))
                                    }
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
                {
                    currentTemplate.name && (
                        <div className="course__builder-slide__form">
                            {renderer(currentTemplate.id)}
                        </div>
                    )
                }
            </div>

            {/* <div className="course__builder-slide__preview">

            </div> */}
            <div className="course__builder-slide__navigation">
                <div className="main__btn">
                    {
                        slide.length !== 0 && (
                            <Link href={`/slide?key=${lessonId}&type=lesson`}>
                                <div className="all">
                                    <p>All Slides</p>
                                </div>
                            </Link>
                        )
                    }
                </div>
                <div className="lesson__btn">
                    <motion.button className="previous" whileTap={{ scale: .97 }} onClick={onPrevClick} >
                        <p>Previous Slide</p>
                        <MdOutlineArrowBackIos size={20} />
                    </motion.button>
                    <motion.button className="add" whileTap={{ scale: .97 }} onClick={() => setCurrentTemplate({ id: null, name: null, temp: null })}>
                        <p>Add Slide</p>
                        <AiOutlinePlus size={20} />
                    </motion.button>
                    <motion.button className="done" whileTap={{ scale: .97 }} onClick={() => router.push("/addcourse")}>
                        Done
                    </motion.button>
                </div>
            </div>
        </div >
    )
}


export default Slide