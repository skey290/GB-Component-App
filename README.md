# GB-Component-App

Gabrielle의 **앱 컴포넌트** 모음입니다. [GB-Design-System](https://github.com/skey290/GB-Design-System)의 아토믹 컴포넌트를 조합해 만든, 특정 화면 맥락을 가진 컴포넌트들이 여기 있습니다.

## 세 저장소의 역할

| 저장소 | 담는 것 |
| --- | --- |
| [GB-Design-System](https://github.com/skey290/GB-Design-System) | 디자인 토큰과 범용 아토믹 컴포넌트 — **모든 것의 뿌리** |
| **GB-Component-App** (여기) | 아토믹을 조합한 앱 컴포넌트 |
| [GB-Data-Vis](https://github.com/skey290/GB-Data-Vis) | 데이터 비주얼라이제이션 컴포넌트 |

## 컴포넌트

| 컴포넌트 | 설명 |
| --- | --- |
| `Gnb` | 메인 사이드바. `MenuButton`/`MenuNotification`/`NotiDropdown`을 조합 |
| `MenuButton` | GNB 내비게이션 항목 하나 |
| `MenuNotification` | GNB 알림벨 트리거 |
| `NotiDropdown` | 알림벨 클릭 시 열리는 드롭다운 패널 (`Tabs` + `Badge` 재사용) |
| `FloatingProfile` | 프로필 플로팅 패널 |
| `ProfilePrint` | 프로필 이미지 출력 카드 (`Skeleton` + `Spinner` 재사용) |
| `AssetHistoryDrawer` | 에셋 작업 이력 드로어 |
| `ChatboxComposer` | `Chatbox` 슬롯에 첨부 썸네일·칩·문장 옵션을 채우는 조합 |

## `components/ui/`에 대하여

이 저장소의 `components/ui/`는 **편집 대상이 아닙니다.** 조합 컴포넌트가 import할 수 있도록 GB-Design-System에서 그대로 배포된 사본입니다. 아토믹을 고쳐야 한다면 GB-Design-System 쪽에서 고치세요 — 그러면 이곳에도 자동으로 반영됩니다.

## 실행

```bash
npm install
npm run storybook   # http://localhost:6006
npm test
```
