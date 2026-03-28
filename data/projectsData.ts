export interface ProjectOverride {
  description?: string
  imgSrc?: string
  tags?: string[]
  hidden?: boolean
  order?: number
}

const projectOverrides: Record<string, ProjectOverride> = {
  'SeoDongOk.github.io': {
    description:
      '개인 포트폴리오 사이트입니다. 글, 프로젝트, 작업 기록을 한곳에서 볼 수 있도록 구성했습니다.',
    tags: ['Next.js', 'MDX', 'Portfolio'],
    order: 999,
  },
  'aws-live-trading-system': {
    description:
      'Python과 AWS를 기반으로 자동매매 시스템 구조와 배포 흐름을 정리한 프로젝트입니다.',
    tags: ['Python', 'AWS', 'Trading'],
    order: 1,
  },
  airplane_data_scheduler: {
    description:
      '국제 항공사 데이터를 주기적으로 수집하는 Python 스케줄러입니다. 배치 작업과 수집 자동화에 초점을 두었습니다.',
    tags: ['Python', 'Scheduler', 'Crawler'],
    order: 2,
  },
  nestjs_tutorial: {
    description:
      'NestJS와 Prisma를 중심으로 백엔드 구조를 학습하고 정리한 TypeScript 프로젝트입니다.',
    tags: ['NestJS', 'Prisma', 'TypeScript'],
    order: 3,
  },
  google_finance_currency: {
    description: '환율 정보를 보여주는 금융 UI를 프론트엔드 관점에서 구현한 프로젝트입니다.',
    tags: ['Frontend', 'Finance UI', 'CSS'],
    order: 4,
  },
  drf_hearth_data: {
    description: 'Django REST Framework 기반으로 개인 건강 데이터를 다루는 서버 프로젝트입니다.',
    tags: ['Django', 'DRF', 'Backend'],
  },
  scrapy_home: {
    description:
      '청년안심주택 추가모집 공고를 크롤링하고 변경 사항을 메일로 알려주는 자동화 프로젝트입니다.',
    tags: ['Python', 'Scrapy', 'Automation'],
  },
  'black-scholes-model': {
    description:
      '블랙-숄즈 방정식 개념을 정리하고 Python으로 모델을 구현한 금융공학 학습 프로젝트입니다.',
    tags: ['Quant', 'Python', 'Finance'],
  },
  binance_future_indicator: {
    description: 'Binance API를 활용해 선물 시장 지표를 다루고 분석하는 실험용 저장소입니다.',
    tags: ['Binance', 'Indicators', 'Quant'],
  },
}

export default projectOverrides
