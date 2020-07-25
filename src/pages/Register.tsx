import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import DefaultLayout from '../layouts/DefaultLayout';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';
import RegisterHeaderText from '../components/Register/RegisterHeaderText';
import LabelText from '../atomics/Typography/LabelText';
import Input from '../atomics/Input';
import Select from '../atomics/Select';
import SquareButton from '../atomics/SquareButton';
import RegisterFooterText from '../components/Register/RegisterFooterText';
import { getGraphQLError } from '../api/errorHandler';

const RegisterWrapperStyle = styled.div`
    margin: 32px auto;
`;

const REGISTER = gql`
    mutation($email: String!, $password: String!, $name: String!, $grade: Int!) {
        register(email: $email, password: $password, name: $name, grade: $grade) {
            name
            email
            grade
            isDeny
            createdAt
            updatedAt
        }
    }
`;

const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('1');

    const [register] = useMutation(REGISTER);

    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setGrade(evt.target.value);
    };

    const onRegisterButtonClick = () => {
        const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
        const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (email === '' || password === '' || rePassword === '' || name === '' || grade === '') {
            cogoToast.warn('빈 칸이 존재합니다.');
            return;
        }
        if (password !== rePassword) {
            cogoToast.warn('비밀번호가 일치 하지 않습니다.');
            return;
        }
        if (!emailRegExp.test(email)) {
            cogoToast.warn('올바른 이메일이 아닙니다.');
            return;
        }
        if (!pwRegExp.test(password)) {
            cogoToast.warn('비밀번호는 영문자, 특수문자, 숫자가 포함되어야 하며 최소 6글자이여야합니다.');
            return;
        }

        register({
            variables: {
                email,
                password,
                name,
                grade: parseInt(grade, 10)
            }
        })
            .then(() => {
                cogoToast.success('회원가입 신청이 완료되었습니다. 가입 수락 후 이용 가능합니다.');
                history.push('/');
            })
            .catch((err) => {
                const gerror = getGraphQLError(err);
                if (!gerror) return;
                cogoToast.error(gerror[1]);
            });
    };

    return (
        <DefaultLayout>
            <CenterContainer>
                <div>
                    <RegisterHeaderText />

                    <RegisterWrapperStyle>
                        <LabelText>이메일</LabelText>
                        <Input
                          value={email}
                          type="email"
                          placeholder="사용할 이메일을 입력해주세요."
                          onChange={(evt) => setEmail(evt.target.value)}
                        />

                        <LabelText>비밀번호 (최소 6글자 이상, 영문자, 숫자, 특수문자 포함)</LabelText>
                        <Input
                          value={password}
                          type="password"
                          placeholder="조건에 맞는 비밀번호를 입력해주세요."
                          onChange={(evt) => setPassword(evt.target.value)}
                        />
                        <Input
                          value={rePassword}
                          type="password"
                          placeholder="확인을 위해 한 번 더 비밀번호를 입력해주세요."
                          onChange={(evt) => setRePassword(evt.target.value)}
                        />

                        <LabelText>이름</LabelText>
                        <Input
                          value={name}
                          type="text"
                          placeholder="실명을 입력해주세요."
                          onChange={(evt) => setName(evt.target.value)}
                        />

                        <LabelText>학년</LabelText>
                        <Select value={grade} onChange={onSelectChange} width="100%">
                            <option value="1">1학년</option>
                            <option value="2">2학년</option>
                            <option value="3">3학년</option>
                        </Select>
                    </RegisterWrapperStyle>

                    <SquareButton onClick={onRegisterButtonClick}>
                        <FontAwesomeIcon icon={faUserPlus} /> 회원가입
                    </SquareButton>

                    <RegisterFooterText />
                </div>
            </CenterContainer>
        </DefaultLayout>
    );
};

export default withRouter(Register);
