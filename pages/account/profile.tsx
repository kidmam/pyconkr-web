import { Button } from 'components/atoms/Button'
import { FormWrapper, H1 } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import intl from 'intl'
import { inject, observer } from 'mobx-react'
import { RouterProps, withRouter } from 'next/router'
import React from 'react'
import { paths } from 'routes/paths'
import { TEAL } from 'styles/colors'
import { StoresType } from '../_app'

// TODO:: disabled 속성 분리 + 파일 업로드 CSS 관리

@inject('stores')
@withRouter
@observer
class Profile extends React.Component<{
  stores: StoresType;
  router: RouterProps;
}> {
  state = {
    profile: {
      email: '',
      oauthType: '',
      nameKo: '',
      nameEn: '',
      phone: '',
      organization: '',
      nationality: '',
      bioKo: '',
      bioEn: '',
      image: '',
      avatarUrl: ''
    },
    profileFile: null
  }

  async componentDidMount() {
    const { stores, router } = this.props

    if (!stores.authStore.logined) {
      router.replace(paths.account.login)

      return
    }
    await stores.profileStore.retrieveMe()
    this.setState({
      profile: {
        ...stores.profileStore.profile
      }
    })
  }

  render() {
    const { stores } = this.props

    return (
      <PageTemplate header={<Header title='프로필' />} footer={<Footer />}>
        <H1>
          <IntlText intlKey='homeTitle'>프로필</IntlText>
        </H1>
        <FormWrapper style={{ marginBottom: '140px' }}>
          <label><IntlText intlKey='homeTitle'>
            프로필 사진
          </IntlText></label>
          <img
            width='160px'
            height='160px'
            src={
              this.state.profile.image
                ? this.state.profile.image
                : this.state.profile.avatarUrl
            }
          />
          <label htmlFor='upload' className='file-upload__label'><IntlText intlKey='homeTitle'>
            업로드
            <input
              id='upload'
              className='file-upload__input'
              name='file-upload'
              type='file'
              multiple
              onChange={({ target: { validity, files } }) => {
                if (!validity.valid || !files) {
                  return
                }
                stores.profileStore.uploadProfileImage(files[0]).then(image => {
                  this.setState({
                    profile: {
                      ...this.state.profile,
                      image
                    }
                  })
                })
              }}
            />
          </IntlText></label>
          <form
            onSubmit={e => {
              e.preventDefault()
              stores.profileStore
                .updateProfile({
                  nameKo: this.state.profile.nameKo,
                  nameEn: this.state.profile.nameEn,
                  bioKo: this.state.profile.bioKo,
                  bioEn: this.state.profile.bioEn,
                  phone: this.state.profile.phone,
                  email: this.state.profile.email,
                  organization: this.state.profile.organization,
                  nationality: this.state.profile.nationality
                })
                .then((profile: any) => {
                  window.alert(intl.get('asdfasdf').d('프로필이 수정되었습니다.'))
                  this.setState({
                    profile: {
                      ...profile
                    }
                  })
                })
            }}
          >
            <label><IntlText intlKey='homeTitle'>
              이메일
            </IntlText></label>
            <input
              type='text'
              value={this.state.profile.email}
              onChange={e =>
                this.setState({
                  profile: {
                    ...this.state.profile,
                    email: e.target.value
                  }
                })
              }
              aria-required={true}
              required
            />
            <label><IntlText intlKey='homeTitle'>
              이름
            </IntlText></label>
            <input
              type='text'
              value={this.state.profile.nameKo}
              onChange={e =>
                this.setState({
                  profile: {
                    ...this.state.profile,
                    nameKo: e.target.value
                  }
                })
              }
              aria-required={true}
              required
            />
            <label><IntlText intlKey='homeTitle'>
              영문 이름
            </IntlText></label>
            <input
              type='text'
              value={this.state.profile.nameEn}
              onChange={e =>
                this.setState({
                  profile: {
                    ...this.state.profile,
                    nameEn: e.target.value
                  }
                })
              }
              aria-required={true}
              required
            />
            <label><IntlText intlKey='homeTitle'>
              전화번호
            </IntlText></label>
            <input
              type='tel'
              value={this.state.profile.phone}
              onChange={e =>
                this.setState({
                  profile: {
                    ...this.state.profile,
                    phone: e.target.value
                  }
                })
              }
            />
            <label><IntlText intlKey='homeTitle'>
              소속
            </IntlText></label>
            <input
              type='text'
              value={this.state.profile.organization}
              onChange={e =>
                this.setState({
                  profile: {
                    ...this.state.profile,
                    organization: e.target.value
                  }
                })
              }
            />
            <label><IntlText intlKey='homeTitle'>
              국적
            </IntlText></label>
            <input
              type='text'
              value={this.state.profile.nationality}
              onChange={e =>
                this.setState({
                  profile: {
                    ...this.state.profile,
                    nationality: e.target.value
                  }
                })
              }
            />
            <label><IntlText intlKey='homeTitle'>
              소개
            </IntlText></label>
            <textarea
              value={this.state.profile.bioKo}
              onChange={e =>
                this.setState({
                  profile: {
                    ...this.state.profile,
                    bioKo: e.target.value
                  }
                })
              }
            />
            <label><IntlText intlKey='homeTitle'>
              영문소개
            </IntlText></label>
            <textarea
              value={this.state.profile.bioEn}
              onChange={e =>
                this.setState({
                  profile: {
                    ...this.state.profile,
                    bioEn: e.target.value
                  }
                })
              }
            />
            <FlexCenterWrapper>
              <Button
                type='submit'
                intlKey='asdfasdfsd'
                color={TEAL}
                style={{ marginTop: '20px' }}
              >
                프로필 업데이트
              </Button>
            </FlexCenterWrapper>
          </form>
        </FormWrapper>
      </PageTemplate>
    )
  }
}

export default Profile
