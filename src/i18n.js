export const translations = {
  en: {
    nav_brand_title: "AI Trial Optimization",
    nav_brand_subtitle: "Phase II Research Demo",
    nav_home: "Research",
    nav_ai: "AI Model",
    nav_econ: "Economics",
    lang_toggle: "EN | KO",

    hero_kicker: "Phase II Clinical Trials",
    hero_title:
      "AI Optimization of Phase II Clinical Trials for Type 2 Diabetes",
    hero_subtitle:
      "Improving success probability, reducing cost, and accelerating drug development.",
    hero_note:
      "Evidence-informed modeling for higher-confidence decision-making in early clinical development.",
    summary_kicker: "Study Summary",
    summary_item_1: "Dataset: 2015–2024 global Phase II trials",
    summary_item_2: "Focus: Type 2 Diabetes efficacy signals",
    summary_item_3: "Outputs: success probability + economic efficiency",
    summary_note: "Research demo prototype. No real patient data.",
    scroll_label: "Scroll",

    background_subtitle: "Research Background",
    background_title: "Why Phase II Trial Design Matters",
    background_card1_title: "Type 2 Diabetes",
    background_card1_text:
      "A chronic metabolic condition characterized by insulin resistance and elevated blood glucose, impacting global health systems and costs.",
    background_card2_title: "Clinical Trial Design",
    background_card2_text:
      "Phase II trials validate dose, efficacy, and safety signals, shaping the probability of Phase III success and regulatory pathways.",
    background_card3_title: "Traditional Pain Points",
    background_card3_text:
      "High cost, long timelines, and limited adaptive design options create uncertainty and late-stage failure risk.",

    objectives_subtitle: "Research Objectives",
    objectives_title: "AI-Enabled Trial Optimization Goals",
    objective_1: "Build AI model from 2015–2024 Phase II data",
    objective_2: "Predict trial success probability",
    objective_3: "Compare AI vs Traditional design",
    objective_4: "Evaluate economic impact",
    objective_5: "Show cost-to-price ripple effects",

    model_subtitle: "AI Model Concept",
    model_title: "Inputs to Outputs Pipeline",
    model_inputs_label: "Inputs",
    model_ai_label: "AI Model",
    model_outputs_label: "Outputs",
    model_input_1: "Sample size",
    model_input_2: "Duration",
    model_input_3: "Control group type",
    model_input_4: "Blinding",
    model_input_5: "Primary endpoint",
    model_output_1: "Predicted success probability",
    model_output_2: "Estimated cost",
    model_output_3: "Efficiency score",
    model_ai_text:
      "Ensemble optimization with calibrated probability weighting trained on historical Phase II performance and protocol metadata.",

    econ_flow_subtitle: "Economic Impact Framework",
    econ_flow_title: "From AI Optimization to Cost Savings",
    econ_flow_step_1: "AI Optimization",
    econ_flow_step_2: "Shorter Trial",
    econ_flow_step_3: "Lower Cost",
    econ_flow_step_4: "Higher R&D Efficiency",
    econ_flow_step_5: "Potential Drug Price Reduction",

    impact_subtitle: "Expected Impact",
    impact_title: "Stakeholder Benefits",
    impact_pharma_title: "Pharma Companies",
    impact_pharma_text:
      "Reduce late-stage uncertainty and reallocate capital to high-signal compounds.",
    impact_investor_title: "Investors",
    impact_investor_text:
      "Sharper probability curves improve portfolio allocation and risk-adjusted returns.",
    impact_patient_title: "Patients",
    impact_patient_text:
      "Faster trial throughput accelerates access to novel therapies.",
    impact_system_title: "Healthcare Systems",
    impact_system_text:
      "Lower development cost supports more sustainable pricing and coverage models.",

    ai_kicker: "AI Model Test Page",
    ai_title: "Trial Optimization Simulator",
    ai_intro:
      "Enter your Phase II design inputs to receive a deterministic AI-based projection of success probability, trial cost, and efficiency score.",
    input_params_title: "Input Parameters",
    form_summary: "{participants} participants • {duration} months • {control}",

    label_participants: "Number of Participants",
    label_duration: "Trial Duration (months)",
    label_control: "Control Group Type",
    label_blinding: "Blinding",
    label_endpoint: "Primary Endpoint",

    option_control_placebo: "Placebo",
    option_control_active: "Active Comparator",
    option_blinding_open: "Open Label",
    option_blinding_single: "Single Blind",
    option_blinding_double: "Double Blind",
    option_endpoint_hba1c: "HbA1c Change",
    option_endpoint_fasting: "Fasting Glucose",
    option_endpoint_composite: "Composite",

    btn_run: "Run AI Optimization",

    results_title: "AI Results",
    results_prompt:
      "Run the AI optimization to generate trial projections and recommendations.",
    card_success: "Predicted Success Probability",
    card_cost: "Estimated Trial Cost (USD)",
    card_efficiency: "Duration Efficiency Score",
    adjustments_title: "AI Suggested Adjustments",
    adjustments_none: "No recommendations yet.",
    adjustments_ok:
      "Design parameters appear robust. No immediate changes suggested.",
    rec_duration: "Consider shortening duration to under 18 months.",
    rec_participants: "Increase participants to at least 150 for signal stability.",
    rec_endpoint: "Consider HbA1c Change for stronger regulatory alignment.",

    econ_kicker: "Economic Analysis",
    econ_title: "Phase II Economic Impact Simulator",
    econ_intro:
      "Simulated data for 990 Phase II trials illustrates how AI-driven duration compression can reduce cost while preserving statistical signal.",
    chart_duration_title: "Trial Duration Distribution",
    chart_cost_title: "Trial Cost Distribution",
    chart_median_duration_title: "Median Duration vs AI Duration",
    chart_median_cost_title: "Median Cost vs AI Cost",
    chart_median_duration_label: "Median Duration",
    chart_ai_duration_label: "AI Duration",
    chart_median_cost_label: "Median Cost",
    chart_ai_cost_label: "AI Cost",

    dataset_title: "Trial Dataset",
    dataset_subtitle:
      "Showing {page} of {total} pages. Median duration: {median}d • AI median duration: {medianAI}d.",

    table_id: "Trial ID",
    table_duration: "Duration (days)",
    table_cost: "Cost (USD)",
    table_duration_ai: "Duration (AI)",
    table_cost_ai: "Cost (AI)",
    table_cost_savings: "Cost Savings (USD)",
    table_roi_efficiency: "ROI Efficiency",

    prev: "Prev",
    next: "Next",
    page_label: "Page {page} of {total}",

    notes_title: "Methodological Notes",
    notes_text:
      "The duration distribution is simulated around a 520-day median to mirror typical Phase II timelines reported in the literature and public trial registries. The cost baseline of $23,737 per day reflects aggregate estimates for operational trial expenses. Median comparisons are used to reduce the effect of skewed outliers and better reflect central tendency. Cost Savings measures the direct reduction in trial execution cost after AI optimization. ROI Efficiency indicates whether AI reduces cost enough to improve ROI structure across a broad revenue range, with revenue simulated from $10,000 to $2B to avoid reliance on a single assumed sales value.",

    references_title: "Reference List"
  },
  ko: {
    nav_brand_title: "AI 임상 최적화",
    nav_brand_subtitle: "2상 연구 데모",
    nav_home: "연구 소개",
    nav_ai: "AI 모델 테스트",
    nav_econ: "경제성 분석",
    lang_toggle: "EN | KO",

    hero_kicker: "2상 임상시험",
    hero_title:
      "제2형 당뇨병 2상 임상시험의 AI 최적화 모델 개발과 경제성 분석",
    hero_subtitle:
      "성공 확률을 높이고 비용을 줄이며 신약 개발을 가속화하다",
    hero_note:
      "초기 임상 개발 의사결정을 위한 근거 기반 모델링으로 더 높은 신뢰도를 확보합니다.",
    summary_kicker: "연구 요약",
    summary_item_1: "데이터셋: 2015–2024 글로벌 2상 임상시험",
    summary_item_2: "대상: 제2형 당뇨병 효능 지표",
    summary_item_3: "산출물: 성공 확률 + 경제적 효율",
    summary_note: "연구 데모 프로토타입입니다. 실제 환자 데이터는 포함되지 않습니다.",
    scroll_label: "스크롤",

    background_subtitle: "연구 배경",
    background_title: "2상 임상 설계가 중요한 이유",
    background_card1_title: "제2형 당뇨병",
    background_card1_text:
      "인슐린 저항성과 고혈당이 특징인 만성 대사 질환으로, 전 세계 보건 시스템과 비용에 큰 부담을 줍니다.",
    background_card2_title: "임상시험 설계",
    background_card2_text:
      "2상 임상은 용량, 효능, 안전성 신호를 검증하여 3상 성공 확률과 규제 경로를 결정합니다.",
    background_card3_title: "기존 설계의 한계",
    background_card3_text:
      "높은 비용, 긴 기간, 제한적인 적응형 설계로 인해 불확실성과 후기 단계 실패 위험이 큽니다.",

    objectives_subtitle: "연구 목표",
    objectives_title: "AI 기반 임상 최적화 핵심 목표",
    objective_1: "2015–2024년 2상 데이터 기반 AI 모델 구축",
    objective_2: "임상 성공 확률 예측",
    objective_3: "AI 설계와 기존 설계 비교",
    objective_4: "경제적 영향 평가",
    objective_5: "비용-가격 파급효과 제시",

    model_subtitle: "AI 모델 개념",
    model_title: "입력에서 예측 결과까지",
    model_inputs_label: "입력값",
    model_ai_label: "AI 모델",
    model_outputs_label: "예측 결과",
    model_input_1: "표본 수",
    model_input_2: "기간",
    model_input_3: "대조군 유형",
    model_input_4: "눈가림",
    model_input_5: "1차 평가 지표",
    model_output_1: "예측 성공 확률",
    model_output_2: "예상 비용",
    model_output_3: "효율성 점수",
    model_ai_text:
      "과거 2상 성과와 프로토콜 메타데이터를 학습한 확률 보정 앙상블 최적화 모델입니다.",

    econ_flow_subtitle: "경제성 분석 프레임워크",
    econ_flow_title: "AI 최적화에서 비용 절감까지",
    econ_flow_step_1: "AI 최적화",
    econ_flow_step_2: "시험 기간 단축",
    econ_flow_step_3: "비용 절감",
    econ_flow_step_4: "R&D 효율 향상",
    econ_flow_step_5: "약가 인하 가능성",

    impact_subtitle: "기대 효과",
    impact_title: "이해관계자 혜택",
    impact_pharma_title: "제약사",
    impact_pharma_text:
      "후기 단계 불확실성을 줄이고, 높은 신호의 후보 물질에 자본을 재배분합니다.",
    impact_investor_title: "투자자",
    impact_investor_text:
      "정밀한 확률 곡선으로 포트폴리오 배분과 위험 조정 수익을 개선합니다.",
    impact_patient_title: "환자",
    impact_patient_text:
      "임상 속도 향상으로 혁신 치료제 접근성을 높입니다.",
    impact_system_title: "의료 시스템",
    impact_system_text:
      "개발 비용 절감이 더 지속 가능한 약가와 보장 구조를 지원합니다.",

    ai_kicker: "AI 모델 테스트 페이지",
    ai_title: "임상 최적화 시뮬레이터",
    ai_intro:
      "2상 설계 입력값을 기반으로 AI가 성공 확률, 비용, 효율성 점수를 예측합니다.",
    input_params_title: "입력 파라미터",
    form_summary: "참여자 {participants}명 • {duration}개월 • {control}",

    label_participants: "참여자 수",
    label_duration: "시험 기간 (개월)",
    label_control: "대조군 유형",
    label_blinding: "눈가림 여부",
    label_endpoint: "1차 평가 지표",

    option_control_placebo: "위약",
    option_control_active: "활성 비교군",
    option_blinding_open: "공개",
    option_blinding_single: "단일 눈가림",
    option_blinding_double: "이중 눈가림",
    option_endpoint_hba1c: "HbA1c 변화",
    option_endpoint_fasting: "공복 혈당",
    option_endpoint_composite: "복합 지표",

    btn_run: "AI 최적 설계 실행",

    results_title: "AI 결과",
    results_prompt: "AI 최적화를 실행하면 예측 결과가 표시됩니다.",
    card_success: "예측 성공 확률",
    card_cost: "예상 임상 비용 (USD)",
    card_efficiency: "기간 효율성 점수",
    adjustments_title: "AI 설계 개선 제안",
    adjustments_none: "추천 사항이 없습니다.",
    adjustments_ok: "설계가 안정적입니다. 추가 변경은 필요하지 않습니다.",
    rec_duration: "시험 기간을 18개월 이하로 단축하는 것을 고려하세요.",
    rec_participants: "신호 안정성을 위해 참여자 수를 150명 이상으로 늘리세요.",
    rec_endpoint: "규제 적합성이 높은 HbA1c 변화를 고려하세요.",

    econ_kicker: "경제성 분석",
    econ_title: "2상 임상 경제성 영향 시뮬레이터",
    econ_intro:
      "990건의 2상 임상시험을 시뮬레이션하여 AI 기반 기간 단축이 비용 절감에 어떻게 기여하는지 보여줍니다.",
    chart_duration_title: "임상시험 기간 분포",
    chart_cost_title: "임상시험 비용 분포",
    chart_median_duration_title: "기존 대비 AI 적용 기간 중앙값 비교",
    chart_median_cost_title: "기존 대비 AI 적용 비용 중앙값 비교",
    chart_median_duration_label: "기존 중앙값",
    chart_ai_duration_label: "AI 적용",
    chart_median_cost_label: "기존 중앙값",
    chart_ai_cost_label: "AI 적용",

    dataset_title: "임상 데이터셋",
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

    notes_title: "분석 설명",
    notes_text:
      "임상 기간 분포는 문헌과 공공 임상 등록 자료에 보고되는 2상 평균 일정을 반영하기 위해 중앙값 520일을 기준으로 시뮬레이션했습니다. 하루 비용 $23,737은 운영비 평균치를 반영한 가정치입니다. 중앙값 비교는 이상치의 영향을 줄여 대표성을 높입니다. 비용 절감은 AI 최적화 이후 임상 실행 비용이 얼마나 줄었는지를 의미합니다. ROI 효율성은 비용 감소가 ROI 구조를 개선하는지 확인하며, 매출은 $10,000에서 $2B까지 범위로 시뮬레이션해 특정 판매 가정에 의존하지 않도록 했습니다.",

    references_title: "참고문헌"
  }
};
