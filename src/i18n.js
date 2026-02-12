export const translations = {
  en: {
    nav_brand_title: "AI Clinical Trial Optimization",
    nav_brand_subtitle: "Phase II Research Prototype",
    nav_home: "Study Overview",
    nav_ai: "AI Model",
    nav_econ: "Economic Analysis",
    nav_chat: "Research Chat",
    lang_toggle: "EN | KO",

    hero_kicker: "Phase II Clinical Trials",
    hero_title:
      "AI-Based Optimization of Phase II Clinical Trials in Type 2 Diabetes",
    hero_subtitle:
      "Assessment of success probability, cost, and development timelines.",
    hero_note:
      "Evidence-informed modeling to support early clinical development decisions.",
    summary_kicker: "Study Summary",
    summary_item_1: "Dataset: Global Phase II trials (2015-2024)",
    summary_item_2: "Focus: Efficacy signals in Type 2 Diabetes",
    summary_item_3: "Outputs: Success probability and economic efficiency",
    summary_note:
      "Prototype for research demonstration; no real patient-level data included.",
    scroll_label: "Scroll",

    background_subtitle: "Research Background",
    background_title: "Rationale for Phase II Trial Design",
    background_card1_title: "Type 2 Diabetes",
    background_card1_text:
      "A chronic metabolic condition characterized by insulin resistance and hyperglycemia, with substantial impacts on global health systems and costs.",
    background_card2_title: "Clinical Trial Design",
    background_card2_text:
      "Phase II trials evaluate dose-response, efficacy, and safety signals, informing Phase III feasibility and regulatory strategy.",
    background_card3_title: "Conventional Limitations",
    background_card3_text:
      "High costs, extended timelines, and limited adaptive design options increase uncertainty and late-stage failure risk.",

    objectives_subtitle: "Research Objectives",
    objectives_title: "Objectives for AI-Assisted Trial Optimization",
    objective_1: "Develop AI models using Phase II data from 2015-2024",
    objective_2: "Estimate trial success probability",
    objective_3: "Compare AI-assisted and conventional designs",
    objective_4: "Assess economic impact",
    objective_5: "Characterize cost-to-price transmission effects",

    model_subtitle: "AI Model Framework",
    model_title: "Input-to-Output Pipeline",
    model_inputs_label: "Inputs",
    model_ai_label: "AI Model",
    model_outputs_label: "Outputs",
    model_input_1: "Sample size",
    model_input_2: "Duration",
    model_input_3: "Control group type",
    model_input_4: "Blinding",
    model_input_5: "Primary endpoint",
    model_output_1: "Estimated success probability",
    model_output_2: "Estimated cost",
    model_output_3: "Efficiency index",
    model_ai_text:
      "Ensemble modeling with calibrated probability estimates trained on historical Phase II outcomes and protocol metadata.",

    econ_flow_subtitle: "Economic Analysis Framework",
    econ_flow_title: "Pathway from Optimization to Cost Implications",
    econ_flow_step_1: "AI-assisted design",
    econ_flow_step_2: "Reduced duration",
    econ_flow_step_3: "Lower direct costs",
    econ_flow_step_4: "R&D efficiency gains",
    econ_flow_step_5: "Potential price effects",

    impact_subtitle: "Anticipated Effects",
    impact_title: "Stakeholder Implications",
    impact_pharma_title: "Pharmaceutical Sponsors",
    impact_pharma_text:
      "Reduce late-stage uncertainty and support capital allocation toward candidates with stronger signals.",
    impact_investor_title: "Investors",
    impact_investor_text:
      "Improved probability estimates inform portfolio allocation and risk-adjusted evaluation.",
    impact_patient_title: "Patients",
    impact_patient_text:
      "Shorter trial timelines may reduce time to access for new therapies.",
    impact_system_title: "Healthcare Systems",
    impact_system_text:
      "Lower development costs may inform pricing and coverage assessments.",

    ai_kicker: "AI Model Evaluation",
    ai_title: "Trial Optimization Simulation",
    ai_intro:
      "Input Phase II design parameters to generate AI-based projections of success probability, trial cost, and efficiency.",
    input_params_title: "Input Parameters",
    form_summary: "{participants} participants • {duration} months • {control}",

    label_participants: "Number of participants",
    label_duration: "Trial duration (months)",
    label_control: "Control group type",
    label_blinding: "Blinding",
    label_endpoint: "Primary endpoint",

    option_control_placebo: "Placebo",
    option_control_active: "Active comparator",
    option_blinding_open: "Open label",
    option_blinding_single: "Single blind",
    option_blinding_double: "Double blind",
    option_endpoint_hba1c: "HbA1c change",
    option_endpoint_fasting: "Fasting glucose",
    option_endpoint_composite: "Composite",

    btn_run: "Run AI optimization",

    results_title: "AI Output",
    results_prompt:
      "Run the optimization to generate trial projections and structured suggestions.",
    card_success: "Estimated success probability",
    card_cost: "Estimated trial cost (USD)",
    card_efficiency: "Duration efficiency index",
    adjustments_title: "AI suggested revisions",
    adjustments_none: "No recommendations available.",
    adjustments_ok:
      "Design parameters are stable; no immediate changes are indicated.",
    rec_duration: "Consider reducing duration to under 18 months.",
    rec_participants: "Increase participants to at least 150 to support signal stability.",
    rec_endpoint: "Consider HbA1c change for regulatory alignment.",
    ai_lock: "Lock",
    ai_locked: "Locked",
    ai_optimized_title_locked: "AI-optimized design (locked parameters applied)",
    ai_constraint_note:
      "This system performs constraint-based optimization. Researchers can lock specific design parameters that must remain unchanged, and the AI adjusts remaining variables to improve efficiency while preserving clinical requirements.",
    ai_optimized_title: "AI-recommended trial design",
    ai_original_design: "Original design",
    ai_original_tooltip: "These are the parameters you first entered.",
    ai_optimized_design: "AI-optimized design",
    ai_label_participants: "Participants:",
    ai_label_duration: "Duration (months):",
    ai_label_control: "Control group:",
    ai_label_blinding: "Blinding:",
    ai_label_endpoint: "Primary endpoint:",
    ai_label_success: "Success probability:",
    ai_label_cost: "Estimated cost:",
    ai_label_efficiency: "Efficiency index:",
    ai_efficiency_unit: "index",
    ai_optimized_note:
      "The AI-optimized design is generated by adjusting key trial parameters such as endpoint selection, masking strategy, sample size, and duration. This reflects a research approach in which the model explores alternative configurations to improve efficiency while maintaining clinical success probability.",
    ai_modal_close: "Close",

    econ_kicker: "Economic Analysis",
    econ_title: "Phase II Economic Impact Simulation",
    econ_intro:
      "Simulation of 990 Phase II trials evaluates how AI-assisted duration reduction affects costs while maintaining statistical signal.",
    chart_duration_title: "Trial duration distribution",
    chart_cost_title: "Trial cost distribution",
    chart_median_duration_title: "Median duration vs AI duration",
    chart_median_cost_title: "Median cost vs AI cost",
    chart_median_duration_label: "Median duration",
    chart_ai_duration_label: "AI duration",
    chart_median_cost_label: "Median cost",
    chart_ai_cost_label: "AI cost",

    dataset_title: "Trial dataset",
    dataset_subtitle:
      "Showing {page} of {total} pages. Median duration: {median}d • AI median duration: {medianAI}d.",

    table_id: "Trial ID",
    table_duration: "Duration (days)",
    table_cost: "Cost (USD)",
    table_duration_ai: "Duration (AI)",
    table_cost_ai: "Cost (AI)",
    table_cost_savings: "Cost savings (USD)",
    table_roi_efficiency: "ROI efficiency",

    prev: "Prev",
    next: "Next",
    page_label: "Page {page} of {total}",

    notes_title: "Methodological Notes",
    notes_text:
      "The duration distribution is simulated around a 520-day median to align with typical Phase II timelines reported in the literature and public trial registries. The per-day cost baseline of $23,737 reflects aggregate estimates of operational trial expenses. Median comparisons are used to reduce the influence of skewed outliers and reflect central tendency. Cost savings represents the direct reduction in trial execution cost after AI optimization. ROI efficiency evaluates whether cost reductions improve ROI structure across a broad revenue range, with revenue simulated from $10,000 to $2B to avoid reliance on a single assumed sales value.",

    references_title: "References",

    chat_kicker: "Clinical Research Chat",
    chat_title: "Clinical Trial Optimization Assistant",
    chat_disclaimer: "For research assistance only, not medical advice.",
    chat_empty_prompt:
      "Submit a question on trial design, endpoints, or economic trade-offs.",
    chat_input_placeholder: "Enter a clinical trial research question",
    chat_send: "Send",
    chat_user_label: "You",
    chat_assistant_label: "Assistant",
    chat_loading: "Generating response...",
    chat_summary_label: "Summary memo"
  },
  ko: {
    nav_brand_title: "AI 임상시험 최적화",
    nav_brand_subtitle: "2상 연구 프로토타입",
    nav_home: "연구 개요",
    nav_ai: "AI 모델",
    nav_econ: "경제성 분석",
    nav_chat: "연구 채팅",
    lang_toggle: "EN | KO",

    hero_kicker: "2상 임상시험",
    hero_title:
      "제2형 당뇨병 2상 임상시험의 AI 기반 최적화 모델 개발 및 경제성 분석",
    hero_subtitle: "성공 확률, 비용, 개발 기간에 대한 평가",
    hero_note:
      "초기 임상 개발 의사결정을 지원하기 위한 근거 기반 모델링을 제시합니다.",
    summary_kicker: "연구 요약",
    summary_item_1: "데이터셋: 2015-2024 글로벌 2상 임상시험",
    summary_item_2: "대상: 제2형 당뇨병 효능 신호",
    summary_item_3: "산출물: 성공 확률 및 경제적 효율",
    summary_note:
      "연구용 프로토타입이며, 실제 환자 수준 데이터는 포함되지 않습니다.",
    scroll_label: "스크롤",

    background_subtitle: "연구 배경",
    background_title: "2상 임상 설계의 중요성",
    background_card1_title: "제2형 당뇨병",
    background_card1_text:
      "인슐린 저항성과 고혈당이 특징인 만성 대사 질환으로, 전 세계 보건 체계와 비용에 큰 영향을 미칩니다.",
    background_card2_title: "임상시험 설계",
    background_card2_text:
      "2상 임상은 용량-반응, 효능 및 안전성 신호를 평가하여 3상 수행 가능성과 규제 전략을 결정합니다.",
    background_card3_title: "전통적 설계의 한계",
    background_card3_text:
      "높은 비용과 긴 수행 기간, 제한된 적응형 설계로 인해 불확실성과 후기 단계 실패 위험이 증가합니다.",

    objectives_subtitle: "연구 목표",
    objectives_title: "AI 기반 임상 최적화 연구 목표",
    objective_1: "2015-2024년 2상 데이터를 활용한 AI 모델 개발",
    objective_2: "임상 성공 확률 추정",
    objective_3: "AI 설계와 기존 설계의 비교 평가",
    objective_4: "경제적 영향 평가",
    objective_5: "비용-가격 전이 효과의 정성화",

    model_subtitle: "AI 모델 개요",
    model_title: "입력-출력 파이프라인",
    model_inputs_label: "입력값",
    model_ai_label: "AI 모델",
    model_outputs_label: "출력값",
    model_input_1: "표본 수",
    model_input_2: "기간",
    model_input_3: "대조군 유형",
    model_input_4: "눈가림",
    model_input_5: "1차 평가 지표",
    model_output_1: "성공 확률 추정치",
    model_output_2: "비용 추정치",
    model_output_3: "효율성 지수",
    model_ai_text:
      "과거 2상 성과와 프로토콜 메타데이터를 활용하여 확률 보정을 수행한 앙상블 모델입니다.",

    econ_flow_subtitle: "경제성 분석 프레임워크",
    econ_flow_title: "AI 최적화에서 비용 영향까지",
    econ_flow_step_1: "AI 기반 설계",
    econ_flow_step_2: "시험 기간 단축",
    econ_flow_step_3: "직접 비용 감소",
    econ_flow_step_4: "R&D 효율 개선",
    econ_flow_step_5: "약가 영향 가능성",

    impact_subtitle: "예상 효과",
    impact_title: "이해관계자 영향",
    impact_pharma_title: "제약사",
    impact_pharma_text:
      "후기 단계의 불확실성을 완화하고, 신호가 명확한 후보 물질에 대한 자본 배분을 지원합니다.",
    impact_investor_title: "투자자",
    impact_investor_text:
      "확률 추정의 정밀성이 포트폴리오 배분 및 위험 조정 평가에 기여합니다.",
    impact_patient_title: "환자",
    impact_patient_text:
      "임상 기간 단축은 신규 치료제 접근 시점에 영향을 줄 수 있습니다.",
    impact_system_title: "의료 시스템",
    impact_system_text:
      "개발 비용 감소는 약가 및 보장 구조 평가에 참고될 수 있습니다.",

    ai_kicker: "AI 모델 평가",
    ai_title: "임상 최적화 시뮬레이션",
    ai_intro:
      "2상 설계 입력값을 기반으로 AI가 성공 확률, 비용, 효율성 지수를 추정합니다.",
    input_params_title: "입력 파라미터",
    form_summary: "참여자 {participants}명 • {duration}개월 • {control}",

    label_participants: "참여자 수",
    label_duration: "시험 기간 (개월)",
    label_control: "대조군 유형",
    label_blinding: "눈가림 여부",
    label_endpoint: "1차 평가 지표",

    option_control_placebo: "위약",
    option_control_active: "활성 비교군",
    option_blinding_open: "오픈 라벨",
    option_blinding_single: "단일 눈가림",
    option_blinding_double: "이중 눈가림",
    option_endpoint_hba1c: "HbA1c 변화",
    option_endpoint_fasting: "공복 혈당",
    option_endpoint_composite: "복합 지표",

    btn_run: "AI 최적화 실행",

    results_title: "AI 결과",
    results_prompt: "AI 최적화를 실행하면 예측 결과가 산출됩니다.",
    card_success: "성공 확률 추정치",
    card_cost: "추정 임상 비용 (USD)",
    card_efficiency: "기간 효율성 지수",
    adjustments_title: "AI 설계 조정 제안",
    adjustments_none: "현재 단계에서 제안 사항이 없습니다.",
    adjustments_ok:
      "설계 파라미터가 안정적이며 추가 변경이 필요하지 않습니다.",
    rec_duration: "시험 기간을 18개월 미만으로 단축하는 것을 고려하십시오.",
    rec_participants: "신호 안정성을 위해 참여자 수를 150명 이상으로 확대하십시오.",
    rec_endpoint: "규제 적합성을 고려하여 HbA1c 변화를 검토하십시오.",
    ai_lock: "잠금",
    ai_locked: "잠금됨",
    ai_optimized_title_locked: "AI 최적화 설계 (잠금 조건 반영)",
    ai_constraint_note:
      "본 시스템은 제약 조건 기반 최적화를 수행합니다. 연구자는 변경이 불가한 설계 파라미터를 잠글 수 있으며, AI는 나머지 변수만 조정하여 임상 요구사항을 유지하면서 효율성을 개선합니다.",
    ai_optimized_title: "AI 권고 임상 설계",
    ai_original_design: "기존 설계",
    ai_original_tooltip: "사용자가 처음 입력한 파라미터입니다.",
    ai_optimized_design: "AI 최적화 설계",
    ai_label_participants: "참여자 수:",
    ai_label_duration: "기간 (개월):",
    ai_label_control: "대조군:",
    ai_label_blinding: "눈가림:",
    ai_label_endpoint: "1차 평가 지표:",
    ai_label_success: "성공 확률:",
    ai_label_cost: "추정 비용:",
    ai_label_efficiency: "효율성 지수:",
    ai_efficiency_unit: "지수",
    ai_optimized_note:
      "AI 최적화 설계는 평가 지표 선택, 눈가림 전략, 표본 수, 기간 등 핵심 임상 파라미터를 조정하여 생성됩니다. 이는 임상 성공 확률을 유지하면서 효율성 개선을 위해 대안 구성을 탐색하는 연구 접근을 반영합니다.",
    ai_modal_close: "닫기",

    econ_kicker: "경제성 분석",
    econ_title: "2상 임상 경제성 영향 시뮬레이션",
    econ_intro:
      "990건의 2상 임상시험을 시뮬레이션하여 AI 기반 기간 단축이 비용에 미치는 영향을 평가합니다.",
    chart_duration_title: "임상시험 기간 분포",
    chart_cost_title: "임상시험 비용 분포",
    chart_median_duration_title: "기존 대비 AI 적용 기간 중앙값 비교",
    chart_median_cost_title: "기존 대비 AI 적용 비용 중앙값 비교",
    chart_median_duration_label: "기존 중앙값",
    chart_ai_duration_label: "AI 적용",
    chart_median_cost_label: "기존 중앙값",
    chart_ai_cost_label: "AI 적용",

    dataset_title: "임상시험 데이터셋",
    dataset_subtitle:
      "{page} / {total} 페이지 표시 중. 기간 중앙값: {median}일 • AI 중앙값: {medianAI}일.",

    table_id: "임상 ID",
    table_duration: "기간 (일)",
    table_cost: "비용 (달러)",
    table_duration_ai: "AI 적용 기간",
    table_cost_ai: "AI 적용 비용",
    table_cost_savings: "비용 절감 (달러)",
    table_roi_efficiency: "ROI 효율성",

    prev: "이전",
    next: "다음",
    page_label: "페이지 {page} / {total}",

    notes_title: "방법론적 주석",
    notes_text:
      "임상 기간 분포는 문헌 및 공공 임상 등록 자료에 보고되는 2상 일정과 정합성을 확보하기 위해 중앙값 520일을 기준으로 시뮬레이션했습니다. 하루 비용 $23,737은 운영비 평균치를 반영한 가정치입니다. 중앙값 비교는 이상치의 영향을 줄여 대표성을 확보합니다. 비용 절감은 AI 최적화 이후 임상 실행 비용이 얼마나 감소하는지를 의미합니다. ROI 효율성은 비용 감소가 ROI 구조를 개선하는지 평가하며, 매출은 $10,000-$2B 범위로 시뮬레이션하여 단일 판매 가정에 의존하지 않도록 했습니다.",

    references_title: "참고문헌",

    chat_kicker: "임상 연구 채팅",
    chat_title: "임상시험 최적화 연구 보조",
    chat_disclaimer: "연구 보조 목적이며, 의학적 조언이 아닙니다.",
    chat_empty_prompt:
      "시험 설계, 평가 지표, 경제성 트레이드오프에 대한 질문을 입력하십시오.",
    chat_input_placeholder: "임상시험 연구 질문을 입력하십시오",
    chat_send: "전송",
    chat_user_label: "사용자",
    chat_assistant_label: "연구 보조",
    chat_loading: "응답을 생성 중입니다...",
    chat_summary_label: "요약 메모"
  }
};
