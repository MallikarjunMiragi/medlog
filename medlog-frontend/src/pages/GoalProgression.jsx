import React, { useState } from "react";

const GoalProgression = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 text-white">
            <h1 className="text-[#a9d0cd] text-center font-cursive text-3xl font-bold mb-4">
                Goal Progression
            </h1>

            <p className="text-center text-[#d9ede9] font-sans mb-6">
                If you are doing an accreditation, you will see a list of goals below that you need to work
                towards as part of your course. Goals help you gauge which of your clinical activities will
                count towards your assessment. In general, you will need to fulfill all goals to complete an
                accreditation.
            </p>

            {/* Toggle section */}
            <div
                onClick={toggleDropdown}
                className="bg-white/10 border border-white/30 rounded-md p-4 cursor-pointer hover:bg-white/20 transition duration-300 shadow"
            >
                <h2 className="text-xl font-semibold text-teal-300 mb-1">
                    University of East Anglia - Breast Ultrasound Accreditation
                </h2>
                <p className="text-sm text-gray-200">
                    The accumulation of ultrasound procedures that are to be performed while accrediting
                    for the University of East Anglia’s Breast Ultrasound CPD module.
                </p>
            </div>

            {/* Dropdown content */}
            {isOpen && (
                <div className="mt-6 space-y-6">
                    {/* Level 1 */}
                    <div className="bg-white/10 rounded-md p-4 border border-white/20">
                        <h3 className="text-lg font-semibold text-teal-200 mb-2">
                            Level 1 Breast Ultrasound <span className="text-sm text-gray-300">(0/100)</span>
                        </h3>
                        <ul className="list-disc pl-6 text-sm text-gray-200">
                            <li>(0/100) US examination</li>
                        </ul>
                    </div>

                    {/* Level 2 */}
                    <div className="bg-white/10 rounded-md p-4 border border-white/20">
                        <h3 className="text-lg font-semibold text-teal-200 mb-2">
                            Level 2 Breast Ultrasound <span className="text-sm text-gray-300">(0/90)</span>
                        </h3>
                        <ul className="list-disc pl-6 text-sm text-gray-200 space-y-1">
                            <li>(0/10) Axillary node FNA / core biopsy</li>
                            <li>(0/10) Clip insertion</li>
                            <li>(0/10) Core biopsy of lesion</li>
                            <li>(0/10) Evaluate breast prosthesis integrity</li>
                            <li>(0/10) Evaluate tumour response to neoadjuvant therapy</li>
                            <li>(0/10) Localisation of non-palpable cancers / axillary node</li>
                            <li>(0/10) US guided aspiration of seroma</li>
                            <li>(0/10) US guided cyst drainage</li>
                            <li>(0/10) US guided drainage of abscess</li>
                        </ul>
                    </div>

                    {/* Level 3 */}
                    <div className="bg-white/10 rounded-md p-4 border border-white/20">
                        <h3 className="text-lg font-semibold text-teal-200 mb-2">
                            Level 3 Breast Ultrasound <span className="text-sm text-gray-300">(0/5)</span>
                        </h3>
                        <ul className="list-disc pl-6 text-sm text-gray-200">
                            <li>(0/5) Mammotome excision / biopsy</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoalProgression;
