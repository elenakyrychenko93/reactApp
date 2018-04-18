// let my_news = [
//     {
//         author: 'Саша Печкин',
//         text: 'В четчерг, четвертого числа...',
//         bigText: 'В четчерг, четвертого числа в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
//     },
//     {
//         author: 'Просто Вася',
//         text: 'Считаю, что $ должен стоить 35 рублей!',
//         bigText: 'Считаю, что $ должен стоить 35 рублей!.А евро 42!'
//     },
//     {
//         author: 'Гость',
//         text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
//         bigText: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000. На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
//     }
// ];
// window.ee = new EventEmitter();
//
// let Article = React.createClass({
//     getInitialState: function() {
//         return {
//             visible: false
//         };
//     },
//     readmoreClick: function(e) {
//         e.preventDefault();
//         this.setState({visible: true});
//     },
//     hideClick: function(e) {
//         e.preventDefault();
//         this.setState({visible: false});
//     },
//
//     render: function() {
//         let author = this.props.data.author,
//             text = this.props.data.text,
//             bigText = this.props.data.bigText,
//             visible = this.state.visible;
//
//         return (
//             <div className='article'>
//                 <p className='news__author'>{author}:</p>
//                 <p className={'news__text ' + (visible ? 'none': '')}>{text}</p>
//
//                 <a href="#"
//                    onClick={this.readmoreClick}
//                    className={'news__readmore ' + (visible ? 'none': '')}>Подробнее</a>
//                 <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
//                 <a href="#"
//                    onClick={this.hideClick}
//                    className={'news__readmore ' + (visible ? '': 'none')}>Скріть</a>
//             </div>
//         )
//     }
// });
//
// let News = React.createClass({
//     getInitialState: function() {
//         return {
//             counter: 0
//         }
//     },
//     render: function() {
//         let data = this.props.data;
//         let newsTemplate;
//
//         if(data.length > 0) {
//             newsTemplate = data.map(function(item, index) {
//                 return (
//                     <div key={index}>
//                         <Article data={item} />
//                     </div>
//                 )
//             })
//         } else {
//             newsTemplate = <p>К сожалению новостей нет</p>
//         }
//
//
//
//         return (
//             <div className="news">
//                 {newsTemplate}
//                 <strong className={'news__count ' + (data.length > 0 ? '':'none')}>Всего новостей: {data.length}</strong>
//             </div>
//         );
//     }
// });
//
// let Add = React.createClass({
//     getInitialState: function() { //устанавливаем начальное состояние (state)
//         return {
//             agreeNotChecked: true,
//             authorIsEmpty: true,
//             textIsEmpty: true
//             // btnIsDisabled: true
//         };
//     },
//     componentDidMount: function() {
//         ReactDOM.findDOMNode(this.refs.author).focus();
//     },
//     onBtnClickHandler: function(e) {
//         e.preventDefault();
//         let author = ReactDOM.findDOMNode(this.refs.author).value;
//         // let text = ReactDOM.findDOMNode(this.refs.text).value;
//         let text = textEl.value;
//
//         let item = [{
//             author: author,
//             text: text,
//             bigText: '...'
//         }];
//
//         window.ee.emit('News.add', item); // = сгенерируй событие 'News.add' и передай в качестве данных - item.
//
//         textEl.value = '';
//         this.setState({textIsEmpty: true});
//     },
//     onCheckRuleClick: function(e) {
//         this.setState({agreeNotChecked: !this.state.agreeNotChecked});
//     },
//     // onAuthorChange: function(e) {
//     //     if (e.target.value.trim().length > 0) {
//     //         this.setState({authorIsEmpty: false})
//     //     } else {
//     //         this.setState({authorIsEmpty: true})
//     //     }
//     // },
//     // onTextChange: function(e) {
//     //     if (e.target.value.trim().length > 0) {
//     //         this.setState({textIsEmpty: false})
//     //     } else {
//     //         this.setState({textIsEmpty: true})
//     //     }
//     // },
//     onFieldChange: function(fieldName, e) {
//         if (e.target.value.trim().length > 0) {
//             this.setState({[''+fieldName]:false})
//         } else {
//             this.setState({[''+fieldName]:true})
//         }
//     },
//     render: function() {
//         let agreeNotChecked = this.state.agreeNotChecked,
//             authorIsEmpty = this.state.authorIsEmpty,
//             textIsEmpty = this.state.textIsEmpty;
//         return (
//             <form className='add cf'>
//                 <input
//                     type='text'
//                     className='add__author'
//                     onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
//                     placeholder='Ваше имя'
//                     ref='author'
//                 />
//                 <textarea
//                     className='add__text'
//                     onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
//                     placeholder='Текст новости'
//                     ref='text'
//                 ></textarea>
//                 <label className='add__checkrule'>
//                     <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
//                 </label>
//
//                 {/* берем значение для disabled атрибута из state */}
//                 <button
//                     className='add__btn'
//                     onClick={this.onBtnClickHandler}
//                     ref='alert_button'
//                     disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
//                 >
//                     Add news
//                 </button>
//             </form>
//         );
//     }
// });
//
//
//
//
// let App = React.createClass({
//     getInitialState: function() {
//         return {
//             news: my_news
//         };
//     },
//     componentDidMount: function() {
//         let self = this;
//         window.ee.addListener('News.add', function(item) {
//             let nextNews = item.concat(self.state.news);
//             self.setState({news: nextNews});
//         })
//
//     },
//     componentWillUnmount: function() {
//         window.ee.removeListener('News.add');
//     },
//     render: function() {
//         return (
//             <div className="app">
//                 <h1>новости</h1>
//                 <Add />
//                 <News data={this.state.news} />
//             </div>
//         );
//     }
// });
//
// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );

let my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

window.ee = new EventEmitter();


let Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function() {
        return {
            visible: false
        };
    },
    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({visible: true});
    },
    hideClick: function(e) {
        e.preventDefault();
        this.setState({visible: false});
    },
    render: function() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;

        return (
            <div className='article'>
                                <p className='news__author'>{author}:</p>
                                <p className={'news__text ' + (visible ? 'none': '')}>{text}</p>

                                <a href="#"
                                   onClick={this.readmoreClick}
                                    className={'news__readmore ' + (visible ? 'none': '')}>Подробнее</a>
                                 <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
                               <a href="#"
                                  onClick={this.hideClick}
                                  className={'news__readmore ' + (visible ? '': 'none')}>Скріть</a>
                            </div>
        )
    }
});

let News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            counter: 0
        }
    },
    render: function() {
        let data = this.props.data;
        let newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className='news'>
                {newsTemplate}
                <strong
                    className={'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
            </div>
        );
    }
});

let Add = React.createClass({
    getInitialState: function() {
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true,
            // formIsOpened: false
        };
    },


    // openForm: function(e) {
    //     e.preventDefault();
    //     this.setState({formIsOpened: true})
    //
    // },
    // closeForm: function(e) {
    //     e.preventDefault();
    //     this.setState({formIsOpened: false})
    // },


    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onBtnClickHandler: function(e) {
        e.preventDefault();
        let textEl = ReactDOM.findDOMNode(this.refs.text);

        let author = ReactDOM.findDOMNode(this.refs.author).value;
        let text = textEl.value;

        let item = [{
            author: author,
            text: text,
            bigText: '...'
        }];

        window.ee.emit('News.add', item);

        textEl.value = '';
        this.setState({textIsEmpty: true});
    },
    onCheckRuleClick: function(e) {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    },
    onFieldChange: function(fieldName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({[''+fieldName]:false})
        } else {
            this.setState({[''+fieldName]:true})
        }
    },
    render: function() {
        let agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;
            // formIsOpened = this.state.formIsOpened;
        return (
            <form className='add cf'>
                <input
                    type='text'
                    className='add__author'
                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                    placeholder='Ваше имя'
                    ref='author'
                />
                <textarea
                    className='add__text'
                    onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                    placeholder='Текст новости'
                    ref='text'
                ></textarea>
                <label className='add__checkrule'>
                    <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
                </label>

                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert_button'
                    disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
                >
                    Опубликовать новость
                </button>
            </form>
        );
    }
});



let OpenAddForm = React.createClass({
    getInitialState: function() {
        return {
            formIsOpened: false
        };
    },
    openForm: function(e) {
        e.preventDefault();
        this.setState({formIsOpened: true})

    },
    closeForm: function(e) {
        e.preventDefault();
        this.setState({formIsOpened: false})
    },
    render : function() {
        let formIsOpened = this.state.formIsOpened,
            buttonToOpen = "Open Form",
            buttonToClose = "Close Form";
        let form;


        if(this.state.formIsOpened) {
            form =  <Add />
        } else {
            form = ""
        }

        return (
            <div>

                <div className="openFormButton">
                    <button onClick={this.openForm}
                            className={'open__form ' + (formIsOpened ? 'none': '')}
                    >{buttonToOpen}</button>


                    <button onClick={this.closeForm}
                            className={'close__form ' + (formIsOpened ? '': 'none')}
                    >{buttonToClose}</button>
                </div>
                {form}

            </div>



        )

    }
});



let App = React.createClass({
    getInitialState: function() {
        return {
            news: my_news
        };
    },
    componentDidMount: function() {
        let self = this;
        window.ee.addListener('News.add', function(item) {
            let nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        });
    },
    componentWillUnmount: function() {
        window.ee.removeListener('News.add');
    },
    render: function() {
        console.log('render');
        return (
            <div className='app'>
                <OpenAddForm />

                <h3>Новости</h3>
                <News data={this.state.news} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);