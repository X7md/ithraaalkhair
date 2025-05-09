import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormLayout from "../components/FormLayout"; // Assuming this path is correct and FormLayout is defined

const questionsData = [
  {
    sectionTitle: "معلومات المركز الأساسية وبيانات التواصل",
    questions: [
      { id: "s1q1", text: "الموقع" },
      { id: "s1q2", text: "رقم المركز" },
      { id: "s1q3", text: "جنسية الحاج" },
      { id: "s1q4", text: "عدد حجاج المركز" },
      { id: "s1q5", text: "رقم التصريح" },
      { id: "s1q6", text: "ايميل المركز" },
    ],
  },
  {
    sectionTitle: "إجراءات استقبال الحجاج والخدمات الأولية",
    questions: [
      { id: "s2q1", text: "هل يوجد موظف/ة خدمة عملاء ملتزم بالزي الرسمي الموحد وإبراز بطاقة عمل معتمدة؟" },
      
      { id: "s2q3", text: "هل المركز قام بالترحيب بالحجاج عند وصولهم السكن؟" },
      
      { id: "s2q5", text: "هل تم استلام الجوازات بعدد الحجاج من قبل المركز؟" },
      
      { id: "s2q7", text: "هل تم استقبال الحجاج (التابعين لهم) والترحيب بهم  عند السكن  وتزويدهم بمعلومات متكاملة عن الخدمات الواجب تقديمها لهم خلال فترة الإقامة في مكة المكرمة والمدينة المنورة والمشاعر المقدسة وكذلك الخدمات المتاحة للحاج في الجوار؟" },
      
      { id: "s2q9", text: "هل يوجد عمال  لنقل امتعة الحجاج؟" },
      
    ],
  },
  {
    sectionTitle: "التجهيزات، الوثائق التعريفية، والمرفقات النهائية",
    questions: [
      { id: "s3q1", text: "هل تم توزيع بطاقات نسك على الحجاج وتفعيلها؟" },
      
      { id: "s3q3", text: "هل تم التحقق من جاهزية البطاقات التعريفية للسكن قبل وصول الحجاج لتوزيعها عليهم؟" },
      
      { id: "s3q5", text: "هل تم توزيع الاساور على الحجاج قبل صعود الغرف؟" },
      
      { id: "s3q7", text: "هل تم التأكد من احتياجات الحجاج ثم نقلها الى السكن مع تفقد الحافلات قبل مغادرتها؟" },
      
      { id: "s3q9", text: "يرجى إرفاق صورة من بطاقة المشرف" }
    ],
  }
];

// Flatten all questions for react-hook-form defaultValues and global indexing
const allQuestionsFlat = questionsData.flatMap(section => section.questions);

// Calculate starting global index for questions in each section.
// This array stores the starting global index for each section's questions.
// e.g., if section 0 has 2 questions, section 1 has 2 questions:
// sectionGlobalIndexOffsets will be [0, 2].
// Question 0 in section 0 is global index 0.
// Question 0 in section 1 is global index 2.
let cumulativeQuestionCount = 0;
const sectionGlobalIndexOffsets = questionsData.map(section => {
  const offset = cumulativeQuestionCount;
  cumulativeQuestionCount += section.questions.length;
  return offset;
});


export function TestPage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSectionIndex]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors } // Kept for potential future validation
  } = useForm({
    defaultValues: {
      // Initialize a flat 'answers' array for all questions across all sections
      answers: allQuestionsFlat.map(() => ({ answer: null, note: "", file: null })),
    },
  });

  // Watch the entire 'answers' array.
  const watchedAnswers = watch("answers"); 

  const onSubmit = (data) => {
    console.log("Raw form data from react-hook-form:", data);

    // Process the submitted data, e.g., to extract the actual File object(s) from FileList
    const processedAnswers = data.answers.map(ans => ({
      ...ans,
      // If a file is selected, ans.file will be a FileList. Get the first file.
      file: ans.file && ans.file.length > 0 ? ans.file[0] : null,
    }));
    
    console.log("Processed submitted answers (with single File object or null):", processedAnswers);
    alert("تم إرسال النموذج بنجاح! تحقق من وحدة التحكم للبيانات.");
    // Here you would typically send 'processedAnswers' to an API
    // e.g., fetch('/api/submit-form', { method: 'POST', body: JSON.stringify(processedAnswers) });
  };

  // Handler for "Yes"/"No" button clicks
  const handleAnswerSelection = (globalQuestionIndex, value) => {
    setValue(`answers.${globalQuestionIndex}.answer`, value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleNextSection = () => {
    if (currentSectionIndex < questionsData.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const currentSectionData = questionsData[currentSectionIndex];
  const currentSectionStartingGlobalIndex = sectionGlobalIndexOffsets[currentSectionIndex];
  const isLastSection = currentSectionIndex === questionsData.length - 1;
  const isFirstSection = currentSectionIndex === 0;

  return (
    <FormLayout title={currentSectionData.sectionTitle || "قسم السؤال"}>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        {currentSectionData.questions.map((question, questionIndexInSection) => {
          // Calculate the global index for the current question in the flat 'answers' array
          const globalIdx = currentSectionStartingGlobalIndex + questionIndexInSection;
          
          const currentAnswerState = watchedAnswers?.[globalIdx]; 
          const currentAnswerValue = currentAnswerState?.answer;
          const currentFileObjectList = currentAnswerState?.file; // This is a FileList

          return (
            <div key={question.id} className="border rounded-xl p-4 flex flex-col gap-4 shadow-sm">
              <p className="font-semibold text-lg mb-2">{question.text}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-2">
                <button 
                  type="button"
                  onClick={() => handleAnswerSelection(globalIdx, true)}
                  className={`w-full px-6 py-2 rounded-lg border text-lg font-bold transition-colors duration-150 ease-in-out ${
                    currentAnswerValue === true 
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  نعم
                </button>
                <button 
                  type="button" 
                  onClick={() => handleAnswerSelection(globalIdx, false)}
                  className={`w-full px-6 py-2 rounded-lg border text-lg font-bold transition-colors duration-150 ease-in-out ${
                    currentAnswerValue === false 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  لا
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="ملاحظة (اختياري)"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                  {...register(`answers.${globalIdx}.note`)} 
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <label className="w-full sm:w-auto px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-150 ease-in-out text-center">
                    إضافة مرفق <span className="text-xs">(اختياري)</span>
                    <input 
                      type="file" 
                      className="hidden"
                      {...register(`answers.${globalIdx}.file`)} 
                    />
                  </label>
                  {currentFileObjectList && currentFileObjectList.length > 0 && (
                    <span className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-[200px] py-2">
                      {currentFileObjectList[0].name}
                    </span>
                  )}
                </div>
              {/* Example for displaying validation errors (if rules are added via register) */}
              {/* {errors.answers?.[globalIdx]?.answer && (
                <p className="text-sm text-red-500 mt-1">{errors.answers[globalIdx].answer.message}</p>
              )} */}
            </div>
          );
        })}

        <div className="mt-4 flex justify-center gap-4">
          <button
            type="button"
            onClick={handlePreviousSection}
            disabled={isFirstSection}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors duration-150 ease-in-out ${
              isFirstSection
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-muted hover:bg-muted/80 text-white'
            }`}
          >
            السابق
          </button>
          {!isLastSection && (
            <button
              type="button"
              onClick={handleNextSection}
              className="px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-lg transition-colors duration-150 ease-in-out"
            >
              التالي
            </button>
          )}
          {isLastSection && (
            <button 
              type="submit"
              className="px-8 py-3 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-bold text-lg transition-opacity duration-150 ease-in-out"
            >
              إرسال
            </button>
          )}
        </div>
      </form>
    </FormLayout>
  );
}

TestPage.tab = "test";