import '../Login.css';
import check from './images/check.png';

const Logout_modal = ({ onClose, className }) => {
  return (
    <div className={`modal_wrap ${className}`}>
      <div
        className="circle"
        style={{
          width: '45px',
          height: '45px',
          textAlign: 'center',
          lineHeight: '60px',
          borderRadius: '50%',
          backgroundColor: 'rgb(26, 181, 31,0.12)',
        }}
      >
        <img src={check} style={{ width: '27px', margin: '9px auto' }} />
      </div>
      <p style={{ fontSize: '24px', fontWeight: 'bolder' }}>로그아웃 완료</p>
      <p style={{ margin: '0px' }}>이용해주셔서</p>
      <p style={{ margin: '0px 0 15px 0' }}>감사합니다</p>
      <button className="confirmB" onClick={onClose}>
        확인
      </button>
    </div>
  );
};
export default Logout_modal;
