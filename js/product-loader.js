/**
 * 제품 데이터 로더 스크립트
 * 구글 시트에서 제품 데이터를 로드하고 템플릿에 적용합니다.
 */

// 구글 시트 ID
const GOOGLE_SHEET_ID = '1RxvH0-l7xxOZZQTYHbBDp8bfbn8-Gyn_qZucGznluXY';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv`;

// 이미지 경로 처리 헬퍼 함수
function getImagePath(imageName, type) {
    if (!imageName) return '';
    
    // 경로 타입에 따라 적절한 경로 반환
    switch(type) {
        case 'icon':
            return `images/icons/${imageName}`;
        case 'hero':
        case 'detail':
        default:
            return `images/${imageName}`;
    }
}

// CSV 데이터를 파싱하는 함수
async function parseCSV(url) {
    try {
        const response = await fetch(url);
        const csvText = await response.text();
        
        // 헤더와 행 분리
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        const rows = [];
        
        // 각 행을 파싱하여 객체로 변환
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue; // 빈 줄 건너뛰기
            
            const values = lines[i].split(',');
            const row = {};
            
            for (let j = 0; j < headers.length; j++) {
                // 쌍따옴표 제거 및 트림 처리
                let value = values[j] || '';
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.substring(1, value.length - 1);
                }
                row[headers[j]] = value.trim();
            }
            
            if (row.product_id) { // 유효한 행만 추가
                rows.push(row);
            }
        }
        
        return rows;
    } catch (error) {
        console.error('CSV 파일 로드 중 오류:', error);
        return [];
    }
}

// 제품 ID로 데이터 찾기
function findProductById(products, productId) {
    return products.find(product => product.product_id === productId);
}

// URL에서 제품 ID 가져오기
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('product_id') || ''; // 기본값 없음 (첫번째 제품 사용)
}

// 드롭다운 메뉴 채우기
function populateProductDropdown(products, selectedId) {
    const dropdown = document.getElementById('product-select');
    dropdown.innerHTML = ''; // 기존 옵션 제거
    
    // 제품 목록으로 드롭다운 채우기
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.product_id;
        option.textContent = product.product_name;
        dropdown.appendChild(option);
    });
    
    // 선택된 제품 설정
    if (selectedId && dropdown.querySelector(`option[value="${selectedId}"]`)) {
        dropdown.value = selectedId;
    }
}

// 제품 변경 처리
function changeProduct() {
    const dropdown = document.getElementById('product-select');
    const productId = dropdown.value;
    
    // URL 업데이트
    const newUrl = `${window.location.pathname}?product_id=${productId}`;
    window.history.pushState({}, '', newUrl);
    
    // 선택된 제품 로드
    loadSelectedProduct();
}

// 선택된 제품 로드 및 표시
async function loadSelectedProduct() {
    try {
        // 제품 데이터 가져오기
        const products = await loadProductData();
        
        // URL에서 제품 ID 가져오기
        const productId = getProductIdFromUrl();
        
        // 제품 ID로 데이터 찾기 또는 첫번째 제품 사용
        const productData = productId 
            ? findProductById(products, productId) 
            : products[0];
        
        // 제품 데이터 적용
        if (productData) {
            applyProductData(productData);
            populateProductDropdown(products, productData.product_id);
        } else {
            console.warn(`선택한 제품을 찾을 수 없습니다. 첫 번째 제품을 표시합니다.`);
            applyProductData(products[0]);
            populateProductDropdown(products, products[0].product_id);
        }
    } catch (error) {
        console.error('선택된 제품 로드 중 오류:', error);
    }
}

// 제품 데이터 로드
async function loadProductData() {
    try {
        // 구글 시트에서 데이터 가져오기
        return await parseCSV(SHEET_URL);
    } catch (error) {
        console.error('제품 데이터 로드 중 오류:', error);
        return [];
    }
}

// 제품 데이터를 HTML에 적용
function applyProductData(product) {
    if (!product) return;
    
    console.log('적용할 제품 데이터:', product); // 디버깅용 로그
    
    // 제품 제목과 서브타이틀
    document.querySelector('.product-title').textContent = product.product_name || '';
    document.querySelector('.product-subtitle').textContent = product.product_subtitle || '';
    
    // 메인 이미지 - 자동 경로 처리
    const mainImgElem = document.querySelector('.banner-image img');
    mainImgElem.src = getImagePath(product.main_image, 'hero');
    mainImgElem.alt = product.product_name || '상품 이미지';
    
    // 핵심 포인트
    const pointItems = document.querySelectorAll('.point-item');
    
    // 포인트 1
    if (pointItems[0]) {
        pointItems[0].querySelector('h3').textContent = product.point1_title || '';
        pointItems[0].querySelector('p').textContent = product.point1_desc || '';
        const iconImg = pointItems[0].querySelector('.point-icon img');
        if (iconImg) iconImg.src = getImagePath(product.point1_icon, 'icon');
    }
    
    // 포인트 2
    if (pointItems[1]) {
        pointItems[1].querySelector('h3').textContent = product.point2_title || '';
        pointItems[1].querySelector('p').textContent = product.point2_desc || '';
        const iconImg = pointItems[1].querySelector('.point-icon img');
        if (iconImg) iconImg.src = getImagePath(product.point2_icon, 'icon');
    }
    
    // 포인트 3
    if (pointItems[2]) {
        pointItems[2].querySelector('h3').textContent = product.point3_title || '';
        pointItems[2].querySelector('p').textContent = product.point3_desc || '';
        const iconImg = pointItems[2].querySelector('.point-icon img');
        if (iconImg) iconImg.src = getImagePath(product.point3_icon, 'icon');
    }
    
    // 상세 이미지 - 자동 경로 처리
    const detailImages = document.querySelectorAll('.detail-image img');
    if (detailImages[0]) detailImages[0].src = getImagePath(product.detail_image1, 'detail');
    if (detailImages[1]) detailImages[1].src = getImagePath(product.detail_image2, 'detail');
    if (detailImages[2]) detailImages[2].src = getImagePath(product.detail_image3, 'detail');
    
    // 제품 설명
    const descParagraphs = document.querySelectorAll('.description-content p');
    if (descParagraphs[0] && product.description1) {
        const highlightSpan = document.createElement('span');
        highlightSpan.className = 'highlight-text';
        
        // 첫 문장을 강조
        const firstSentence = product.description1.split('.')[0] + '.';
        highlightSpan.textContent = firstSentence;
        
        const restOfText = product.description1.substring(firstSentence.length);
        descParagraphs[0].innerHTML = '';
        descParagraphs[0].appendChild(highlightSpan);
        descParagraphs[0].appendChild(document.createTextNode(restOfText));
    }
    if (descParagraphs[1]) descParagraphs[1].textContent = product.description2 || '';
    if (descParagraphs[2]) descParagraphs[2].textContent = product.description3 || '';
    
    // 사이즈 정보
    const tableRows = document.querySelectorAll('.size-chart table tbody tr');
    
    // 사이즈 1
    if (tableRows[0]) {
        const cells = tableRows[0].querySelectorAll('td');
        cells[0].textContent = product.size1_name || '';
        cells[1].textContent = product.size1_shoulder || '';
        cells[2].textContent = product.size1_chest || '';
        cells[3].textContent = product.size1_length || '';
        cells[4].textContent = product.size1_sleeve || '';
    }
    
    // 사이즈 2
    if (tableRows[1]) {
        const cells = tableRows[1].querySelectorAll('td');
        cells[0].textContent = product.size2_name || '';
        cells[1].textContent = product.size2_shoulder || '';
        cells[2].textContent = product.size2_chest || '';
        cells[3].textContent = product.size2_length || '';
        cells[4].textContent = product.size2_sleeve || '';
    }
    
    // 페이지 타이틀 변경
    document.title = (product.product_name || '상품') + ' - 패션 쇼핑몰';
}

// 인쇄 기능
function printPage() {
    window.print();
}

// 초기화 함수
async function initProductPage() {
    try {
        // 선택된 제품 로드 및 표시
        await loadSelectedProduct();
    } catch (error) {
        console.error('제품 페이지 초기화 중 오류:', error);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initProductPage);

// 전역 함수로 내보내기 (HTML에서 직접 호출 가능)
window.changeProduct = changeProduct;
window.printPage = printPage;
