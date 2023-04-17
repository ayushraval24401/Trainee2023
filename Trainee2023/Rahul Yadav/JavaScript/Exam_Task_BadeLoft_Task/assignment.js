$(document).ready(function () {

    if (localStorage.getItem('LogedinUser') !== null) {


        var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
        $("#username").html(logedinUser[0].Name);

        var customerObject = {
            "Kenneth Woodard": {
                "150001": [],
                "150002": [],
                "150003": [],
                "150004": [],
            },
            "James Fenske": {
                "160001": [],
                "160002": [],
                "160003": [],
                "160004": [],
            },
            "Kelly McCrory": {
                "170001": [],
                "170002": [],
                "170003": [],
                "170004": [],
            },
            "Frances Badger": {
                "180001": [],
                "180002": [],
                "180003": [],
                "180004": [],
            }
        }
        window.onload = function () {
            var user_select = document.getElementById("user-select");
            var invoice = document.getElementById("invoice");
            for (var x in customerObject) {
                user_select.options[user_select.options.length] = new Option(x, x);
            }
            user_select.onchange = function () {

                invoice.length = 1;
                //display correct values
                for (var y in customerObject[this.value]) {
                    invoice.options[invoice.options.length] = new Option(y, y);
                }
            }

        }

        function format(d) {
            let dynamicChildRow = '';
            if (d.stock_part_name && d.stock_part_name.length > 0) {
                dynamicChildRow += '<table class:"table  p-0 m-0 w-100 h-100" class="" id="childpartTable " style="width:100%">';
                dynamicChildRow += '<thead class=" fw-normal bg-light childtable rounded"><tr><th>#</th><th>Stock</th><th>Part</th><th>Action</th></tr></thead>';
                dynamicChildRow += '<tbody>';
                d.stock_part_name.forEach((stock_part_name, index) => {
                    dynamicChildRow += '<tr><td>' + (1 + index) + '</td><td>' + stock_part_name.Stock + '</td><td>' + stock_part_name.Part + `</td><td> <button type="button" data-stock="${d.createddate}" class="btn-close deleteparts" aria-label="Close"></button></td></tr>`;
                });
                dynamicChildRow += '</tbody></table>';
            }
            return dynamicChildRow;
        }

        var isEdit = false;
        $(document).ready(function () {
            var assignment_dataset = JSON.parse(localStorage.getItem("assignmentdata"));
            var table = $('#table_div').DataTable({

                data: assignment_dataset,
                language: {
                    info: "Items _START_ to _END_ of _TOTAL_ total",
                    paginate: {
                        next: '&#62',
                        previous: '&#60'
                    }
                },
                columnDefs: [
                    { orderable: true, targets: 0 },
                    { orderable: false, targets: "_all" },
                    {
                        className: "dt-left",
                        targets: [0],
                    },
                    { width: "30%", targets: [0] },
                    { width: "28%", targets: [1] },
                    { width: "15%", targets: [2] },
                ],
                columns: [

                    { data: 'Invoice', title: ' QB Invoice#', className: 'dt-control', orderable: false, },
                    { data: 'UserId', title: 'Name', orderable: true, className: 'TextCenter' },
                    { data: 'Username', title: 'Created By', orderable: false, className: 'TextCenter' },
                    { data: 'createddate', title: 'Created Date', orderable: false, className: 'TextCenter' },
                    { data: null, title: 'Action', orderable: false, className: 'editauditmodel', defaultContent: '<i class="bi bi-pencil-fill editassignment"  style="font-size: 1rem; color: gray;"></i> &nbsp; <i class="bi bi-clock-history  deleteparts historymodel" style="font-size: 1rem; color: gray;"></i>' },
                ],
                order: [[1, 'asc']],

            });

            $('#table_div tbody').on('click', '.historymodel', function () {
                $("#History_Modal").modal('show');
            });


            // $("#stock_parts").validate({
            //     rules: {
            //         stock: {
            //             required: true,
            //         },
            //         parts: {
            //             required: true,
            //         },
            //     },
            //     messages: {
            //         stock: {
            //             required: "This field is required",
            //         },
            //         parts: {
            //             required: "This field is required",
            //         },
            //     },
            //     submitHandler: function (stock_parts) {
            //         stock_parts.submit();
            //     },
            // });
            // var stock_parts = $("#stock_parts");
            // stock_parts.validate();
            var stock_part_name = new Array;
            document.getElementById("addassignment").onclick = function () {
                // var result = stock_parts.valid();
                // if (result == true) {
                var stockname = document.getElementById("stock-select").value;
                var partname = $("#part-select").val()
                partname = partname.toString().replaceAll(",", " | ");

                var stock_part_obj = {
                    Stock: stockname,
                    Part: partname
                }
                stock_part_name.push(stock_part_obj);
                var html = "";
                stock_part_name.forEach(function (element, index) {
                    html += "<tr>";
                    html += "<td>" + (index + 1) + "</td>";
                    html += "<td>" + element.Stock + "</td>";
                    html += "<td>" + element.Part + "</td>";
                    html += "<td class='tdAction'><button type='button' class='btn btn-sm btn-delete'>&#x2715;</button></td>";
                    html += "</tr>"
                });
                document.getElementById("partstable").innerHTML = html;
                document.getElementById("saveassignment").style.backgroundColor = "#07678d";
                // }
            }

            $("#partstable").on("click", ".btn-delete", function () {
                $(this).closest("tr").remove();
                stock_part_name.splice(this, 1)
            });

            $("#assignmentform").validate({
                rules: {
                    customername: {
                        required: true,
                    },
                    invoice: {
                        required: true,
                    },
                    // stock: {
                    //     required: true,
                    // },
                    // parts: {
                    //     required: true,
                    // },
                },
                messages: {
                    customername: {
                        required: "This field is required",
                    },
                    invoice: {
                        required: "This field is required",
                    },
                    // stock: {
                    //     required: "This field is required",
                    // },
                    // parts: {
                    //     required: "This field is required",
                    // },
                },
                submitHandler: function (assignmentform) {
                    assignmentform.submit();
                },
            });
            var assignmentform = $("#assignmentform");
            assignmentform.validate();
            var assignmentdata = new Array;
            document.getElementById("saveassignment").onclick = function () {
                if (!isEdit) {
                    var result = assignmentform.valid();
                    if (result == true) {
                        var username = document.getElementById("user-select").value;
                        var invoice = document.getElementById("invoice").value;
                        var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
                        var useridname = logedinUser[0].Name;
                        var date = new Date();
                        var current_date = (date.getMonth() + 1) + "-" + date.getDate() + "-" + + date.getFullYear();
                        var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                        var date_time = current_date + " at " + current_time;
                        var assignmentdata = JSON.parse(localStorage.getItem('assignmentdata'));
                        if (stock_part_name.length === 0) {
                            swal("InComplete Detail!", "You Have to Add Atlest One Part!", "warning");
                            return;
                        }
                        var obj1 = {
                            Username: username,
                            Invoice: invoice,
                            UserId: useridname,
                            createddate: date_time,
                            stock_part_name: stock_part_name
                        }
                        if (localStorage.getItem("assignmentdata") == null) {
                            assignmentdata = [];
                        } else {
                            assignmentdata = JSON.parse(localStorage.getItem("assignmentdata"));
                        }
                        assignmentdata.push(obj1);
                        localStorage.setItem("assignmentdata", JSON.stringify(assignmentdata));
                        document.getElementById("assignmentform").reset();
                        $('#assignmentModal').modal('hide');
                        location.reload(true);
                    }
                }
            };



            $('#table_div tbody').on('click', '.editassignment', function () {
                debugger
                isEdit = true;
                var heading = document.getElementById('ModalLabel');
                heading.textContent = 'Edit Assignment';
                var rowdata = table.row($(this).parents('tr')).data();
                var index = table.row($(this).parents('tr')).index();
                $("#user-select").val(rowdata.Username);
                $("#invoice").val(rowdata.Invoice);
                $("#stock-select").val(rowdata.stock_part_name.Stock);
                $("#part-select").val(rowdata.stock_part_name.Part);

                if (rowdata.stock_part_name && rowdata.stock_part_name.length > 0) {
                    rowdata.stock_part_name.forEach(function (stock_part_name, index) {
                        $("#partstable").append('<tr><td>' + (1 + index) + '</td><td>' + stock_part_name.Stock + '</td><td>' + stock_part_name.Part + '</td><td>' + '<button type="button" class="btn-close delete btn-delete" aria-label="Close"></button>' + '</td></tr>');
                    });
                }
                stock_part_name = rowdata.stock_part_name;
                $('#assignmentModal').modal('show');
                $("#saveassignment").click(function () {
                    var username = document.getElementById("user-select").value;
                    var invoice = document.getElementById("invoice").value;
                    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
                    var useridname = logedinUser[0].Name;
                    var date = new Date();
                    var current_date = (date.getMonth() + 1) + "-" + date.getDate() + "-" + + date.getFullYear();
                    var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                    var date_time = current_date + " at " + current_time;
                    var objnew = {
                        Username: username,
                        Invoice: invoice,
                        UserId: useridname,
                        createddate: date_time,
                        stock_part_name: stock_part_name
                    }
                    var assignmentdata = JSON.parse(localStorage.getItem('assignmentdata'));
                    assignmentdata[index] = objnew;
                    localStorage.setItem("assignmentdata", JSON.stringify(assignmentdata));
                    $('#assignmentModal').modal('hide');
                    location.reload(true);
                });
            });

            $(document).on("click", ".deleteparts", function () {
                var index;
                var assignmentName = $(this).attr("data-stock");
                // Remove the corresponding data from local storage
                var assignmentData = JSON.parse(localStorage.getItem("assignmentdata")) || [];
                var assignmentindex = assignmentData.findIndex(x => x.createddate == assignmentName);
                if (assignmentData[assignmentindex].stock_part_name && assignmentData[assignmentindex].stock_part_name.length > 0) {
                    assignmentData[assignmentindex].stock_part_name.splice(index, 1);
                    localStorage.setItem("assignmentdata", JSON.stringify(assignmentData));
                } +
                    stock_part_name.splice(index, 1);
                $(this).closest("tr").remove();
                location.reload(true);
            });

            var StockData = JSON.parse(localStorage.getItem("stockdata")) || [];
            var stockSelect = $('#stock-select');
            stockSelect.empty();
            stockSelect.append($('<option>', { value: '', text: 'Choose Stock Name' }));
            $.each(StockData, function (i, stock) {
                stockSelect.append($('<option>', { value: stock.stockname, text: stock.stockname }));
            });

            // select2 library
            $('.js-example-basic-multiple').select2();


            stockSelect.change(function () {
                var selectedStock = $(this).val();
                var partSelect = $('#part-select');
                partSelect.empty();
                partSelect.append($('<option>', { value: '', text: 'Choose Parts Name' }));
                if (selectedStock) {
                    var selectedStockData = StockData.find(function (stock) {
                        return stock.stockname === selectedStock;
                    });
                    $.each(selectedStockData.partiteam, function (i, part) {
                        partSelect.append($('<option>', { value: part.partno, text: part.partno }, '</option>'));
                    });
                    partSelect.prop('disabled', false);
                } else {
                    partSelect.prop('disabled', true);
                }
            })

            // Add event listener for opening and closing details
            $('#table_div tbody').on('click', 'td.dt-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row(tr);

                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                    // Open this row
                    row.child(format(row.data())).show();
                    tr.addClass('shown');
                }
            });

            var table = $("#table_div").DataTable();
            $("#datatablesearch").on("keyup", function () {
                table.search(this.value).draw();
            });

        });



        $("#logout").click(function () {
            localStorage.removeItem("LogedinUser");
            window.location.replace("login.html");
        });

    } else {
        window.location.href = "login.html"
    }
});  