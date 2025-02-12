import React, { useState } from "react";

const GoalProgression = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="goal-progression-container">
            <h1>Goal progression</h1>
            <p>
                If you are doing an accreditation, you will see a list of goals below that you need to work
                towards as part of your course. Goals help you gauge which of your clinical activities will
                count towards your assessment. In general, you will need to fulfill all goals to complete an
                accreditation.
            </p>

            {/* Goal Section - Click to toggle */}
            <div className="goal-section" onClick={toggleDropdown} style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                <h2>University of East Anglia - Breast Ultrasound Accreditation</h2>
                <p>The accumulation of ultrasound procedures that are to be performed while accrediting for the University of East Anglia’s Breast Ultrasound CPD module</p>
            </div>

            {/* Show goal levels when dropdown is open */}
            {isOpen && (
                <div className="goal-details">
                    <div className="goal-level">
                        <h3>Level 1 Breast Ultrasound (0/100)</h3>
                        <ul>
                            <li>(0/100) US examination</li>
                        </ul>
                    </div>

                    <div className="goal-level">
                        <h3>Level 2 Breast Ultrasound (0/90)</h3>
                        <ul>
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

                    <div className="goal-level">
                        <h3>Level 3 Breast Ultrasound (0/5)</h3>
                        <ul>
                            <li>(0/5) Mammotome excision / biopsy</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoalProgression;
