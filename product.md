# 패션 의류 쇼핑몰 상세페이지 템플릿 작업 기록

## 프로젝트 개요

이 프로젝트는 패션 의류 쇼핑몰의 상세페이지를 위한 재사용 가능한 템플릿을 만드는 작업입니다. 템플릿은 HTML, CSS, JavaScript로 구성되며, 상품 데이터는 CSV 파일을 통해 관리됩니다.

## 파일 구조

```
F:\Project\Templet\
│
├── css\                      # CSS 스타일 폴더
│   └── style.css             # 와디즈 스타일이 적용된 메인 스타일시트
│
├── images\                   # 이미지 폴더
│   ├── main-banner.jpg       # 메인 배너/히어로 이미지
│   ├── detail-1.jpg          # 상세 이미지 1
│   ├── detail-2.jpg          # 상세 이미지 2
│   ├── detail-3.jpg          # 상세 이미지 3
│   │
│   └── icons\                # 아이콘 이미지 폴더
│       ├── linen-icon.svg    # 린넨 소재 아이콘
│       ├── loose-fit-icon.svg # 루즈핏 아이콘
│       ├── versatile-icon.svg # 데일리/비즈니스 아이콘
│       └── ...               # 기타 아이콘들
│
├── js\                       # JavaScript 폴더
│   └── product-loader.js     # CSV 데이터 로드 및 처리 스크립트
│
├── index.html                # 메인 HTML 템플릿
├── product_data.csv          # 상품 데이터 CSV 파일
├── product.md                # 작업 기록 문서 (현재 파일)
└── README.md                 # 프로젝트 설명서
```

## 작업 내용

### 1. 템플릿 기본 구조 설계
- HTML, CSS, JavaScript 파일 생성
- 와디즈 스타일의 디자인 적용
- 반응형 레이아웃 구현

### 2. 데이터 관리 시스템 구축
- CSV 파일 구조 설계
- JavaScript를 통한 데이터 로딩 및 렌더링
- 상품 정보, 이미지 경로, 사이즈 정보 등 통합 관리

### 3. SVG 아이콘 제작
- 상품 특징을 표현하는 아이콘 6개 제작
  - 린넨 소재, 루즈핏, 데일리/비즈니스, 코튼 소재, 오버사이즈, 올시즌
- 와디즈 스타일의 디자인 요소 적용

### 4. 이미지 경로 관리 시스템 개선
- 이미지 자동 경로 생성 기능 추가
- 경로 유형별 (hero, detail, icon) 자동 처리
- CSV 파일에 파일명만 입력하도록 간소화

### 5. 한글 인코딩 문제 해결
- HTML 파일에 UTF-8 메타 태그 명시
- CSV 파일 UTF-8 인코딩으로 저장
- JavaScript CSV 파서 개선

### 6. 파일 구조 최적화
- 불필요한 폴더 및 파일 정리
- 이미지 경로 간소화
- 코드 구조 개선

## CSV 파일 구조 및 사용법

CSV 파일은 다음과 같은 필드를 포함합니다:

1. **기본 정보**
   - `product_id`: 제품 고유 ID (예: 001)
   - `product_name`: 제품명 (예: 럭셔리 린넨 셔츠)
   - `product_subtitle`: 제품 부제목 (예: 여름을 위한 시원한 선택)
   - `main_image`: 메인 이미지 파일명 (예: main-banner.jpg)

2. **핵심 포인트** (각 3세트)
   - `point1_title`, `point1_desc`, `point1_icon`: 첫 번째 포인트
   - `point2_title`, `point2_desc`, `point2_icon`: 두 번째 포인트
   - `point3_title`, `point3_desc`, `point3_icon`: 세 번째 포인트

3. **상세 이미지** (3개)
   - `detail_image1`, `detail_image2`, `detail_image3`: 상세 이미지 파일명

4. **제품 설명** (3단락)
   - `description1`, `description2`, `description3`: 제품 설명 텍스트

5. **사이즈 정보** (2개 사이즈)
   - `size1_name`, `size1_shoulder`, `size1_chest`, `size1_length`, `size1_sleeve`: 첫 번째 사이즈
   - `size2_name`, `size2_shoulder`, `size2_chest`, `size2_length`, `size2_sleeve`: 두 번째 사이즈

### 이미지 파일 관리 방법

1. **메인/히어로 이미지**: `images/` 폴더에 저장하고 CSV에 파일명만 입력 (예: `main-banner.jpg`)
2. **상세 이미지**: `images/` 폴더에 저장하고 CSV에 파일명만 입력 (예: `detail-1.jpg`)
3. **아이콘 이미지**: `images/icons/` 폴더에 저장하고 CSV에 파일명만 입력 (예: `linen-icon.svg`)

JavaScript의 `getImagePath()` 함수가 자동으로 적절한 경로를 생성합니다.

## 추후 작업 계획

1. **다중 상품 지원 강화**
   - URL 파라미터를 통한 상품 전환 기능 개선
   - 상품 목록 페이지 개발

2. **데이터 관리 시스템 고도화**
   - 관리자 인터페이스 개발
   - 더 효율적인 데이터 관리 방법 연구

3. **다양한 템플릿 스타일 개발**
   - 다른 디자인 스타일 추가
   - 테마 선택 기능 구현

4. **성능 최적화**
   - 이미지 로딩 최적화
   - 리소스 캐싱 전략 구현
