interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'AWS Live Trading System',
    description: `Python과 AWS를 기반으로 24/7 자동매매 시스템 구조를 정리한 샘플 포트폴리오 저장소입니다.
    배포 관점과 자동화 흐름을 함께 보여주는 트레이딩 시스템 프로젝트입니다.`,
    href: 'https://github.com/SeoDongOk/aws-live-trading-system',
  },
  {
    title: 'Airplane Data Scheduler',
    description: `국제 항공사 데이터를 주기적으로 수집하는 Python 스케줄러입니다.
    반복 실행, 데이터 수집 자동화, 배치성 작업 설계에 초점을 둔 프로젝트입니다.`,
    href: 'https://github.com/SeoDongOk/airplane_data_scheduler',
  },
  {
    title: 'NestJS Tutorial',
    description: `NestJS와 Prisma를 중심으로 백엔드 구조를 학습한 TypeScript 저장소입니다.
    API 계층화와 ORM 사용 방식, 서비스 구조를 정리하는 흐름이 드러납니다.`,
    href: 'https://github.com/SeoDongOk/nestjs_tutorial',
  },
  {
    title: 'Google Finance Currency Clone',
    description: `환율 정보를 보여주는 금융 UI를 프론트엔드 관점에서 구현한 프로젝트입니다.
    금융 서비스 스타일의 인터페이스와 화면 구성 감각을 볼 수 있습니다.`,
    href: 'https://github.com/SeoDongOk/google_finance_currency',
  },
]

export default projectsData
